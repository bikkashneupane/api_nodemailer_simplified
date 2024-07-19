import express from "express";
import { v4 as uuid4 } from "uuid";
import { editUser, getUser, insertUser } from "../db/user/userModel.js";
import { emailVerification, sendOTP } from "../services/nodemailer.js";
import {
  deleteSession,
  getSession,
  insertSession,
} from "../db/session/sessionModel.js";
import { otpGenerator } from "../util/otpGenerator.js";

const router = express.Router();

// register user
router.post("/", async (req, res) => {
  try {
    const user = await insertUser(req.body);

    if (user?._id) {
      const uniqueKey = uuid4();

      const url = `http://localhost:5173/verify-account?c=${uniqueKey}&e=${user.email}`;

      await insertSession({ token: uniqueKey, associate: user.email });

      emailVerification({ url, email: user.email, fullName: user.fullName });

      return res.json({
        status: "success",
        message: "User registered,check email to verify account",
      });
    }
    res.json({
      status: "error",
      message: "Unable to register account, try again...",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection:")) {
      error.message = "Email already registeres, try new one...";
    }
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

// verify user account and activate
router.post("/verify-account", async (req, res) => {
  try {
    const { c, e } = req.body;

    const session = await getSession({ token: c, associate: e });

    if (session?._id) {
      const user = await editUser(session.associate, { status: "active" });

      user?._id && (await deleteSession(session._id));
      return res.json({
        status: "success",
        message: "Account Verified, Login Now..",
      });
    }

    res.json({
      status: "error",
      message: "Invalid Token",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

// request otp
router.post("/otp-request", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await getUser({ email });

    if (user?._id) {
      // send otp to user mail
      sendOTP({ email, otp: otpGenerator() });
      return res.json({
        status: "success",
        message:
          "If email exist in system you will receive OTP to reset passsword",
      });
    }
    res.json({
      status: "error",
      message: "Your Email is not registered",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
});
export default router;
