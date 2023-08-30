export const validateEmail = (email: string) => {
  // Define our regular expression.
  const regExp = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  // Using test we can check if the text match the pattern
  if (regExp.test(email)) return true;

  return false;
};
