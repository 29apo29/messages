export const passwordInputsControl = (values) => {
  let wrongInputs = [];
  if (values.password.length < 8 || values.password.length > 28)
    wrongInputs.push("password");
  if (values.password !== values.passwordAgain) wrongInputs.push("passwordAgain");
  return { isReady: wrongInputs.length === 0 , wrongInputs };
};
