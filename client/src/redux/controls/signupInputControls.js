export const signupInputControls = (state) => {
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let nameRegex = /^[a-zA-Z\s]{3,28}$/;
  let wrongInputs = [];
  if (
    state.name.length < 3 ||
    state.name.length > 28 ||
    !nameRegex.test(state.name)
  )
    wrongInputs.push("name");
  if (state.username.length < 6 || state.username.length > 16)
    wrongInputs.push("username");
  if (state.email.length < 3 || !emailRegex.test(state.email))
    wrongInputs.push("email");
  if (state.password.length < 6 || state.password.length > 28)
    wrongInputs.push("password");
  if (state.password !== state.passwordAgain) wrongInputs.push("passwordAgain");
  return { wrongInputs, isReady: wrongInputs.length === 0 ? true : false };
};
