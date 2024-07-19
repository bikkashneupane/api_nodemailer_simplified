export const otpGenerator = () => {
  let otp = "";
  const otpLength = 6;

  for (let i = 0; i < otpLength; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};
