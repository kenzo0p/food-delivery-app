export const generateVerificatioinToken = (length = 6): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let verificationCode = "";///6 digit code store here
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    verificationCode += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return verificationCode;
};
