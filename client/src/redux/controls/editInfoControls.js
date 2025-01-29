export const editInfoInputControl = (code,val) => {
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let nameRegex = /^[a-zA-Z\s]{3,28}$/;
  switch (code) {
    case "name":
      if (val.length < 3 || val.length > 28 || !nameRegex.test(val))
        return false;
      break;
    case "username":
      if (val.length < 6 || val.length > 16) return false;
      break;
    case "email":
      if (val.length < 3 || !emailRegex.test(val)) return false;
      break;
    case "bio":
      if (val.length > 50) return false;
      break;
    default:
      break;
  }
  return true;
};
