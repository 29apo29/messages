import DeviceDetector from "device-detector-js";

const getBrowserInfos = () => {
  const deviceDetector = new DeviceDetector();
  const info = {
    ...deviceDetector.parse(window.navigator.userAgent),
    userAgent: window.navigator.userAgent,
  };
  return info;
};

export const removeRefresh = () =>{
  localStorage.removeItem('refresh');
  sessionStorage.removeItem('refresh');
}

export default getBrowserInfos;
