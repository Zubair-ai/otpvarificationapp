import bcrypt from "bcrypt";

const ComparePasswords = (hashedPassword, password) => {
  return bcrypt.compare(password, hashedPassword);
};

export default ComparePasswords;

export const PasswordHash = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log("Failed to accress error");
  }
};

export function generateOTP() {
    const digits = '0123456789';
    let OTP = '';
  
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
  
    return OTP;
  }

  