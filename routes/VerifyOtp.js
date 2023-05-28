import express from "express";
import OptUser from "../modules/User.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/verifyotp", async (req, res) => {
  const {id, otp } = req.body;
  if (!id || !otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or otp",
    });
  }
  try {
    let userdata = await OptUser.findById({ _id: id });
    if (userdata.otp !== otp) {
      return res.status(500).json({
        success: false,
        message: "OTP is not matched please login again",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Login successful",
        userData: {
          email: userdata.email,
        },
      });
    }
  } catch (error) {
    console.log("this is error", error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
});
export default router;
