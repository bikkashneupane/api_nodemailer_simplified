import express from "express";
import { v4 as uuid4 } from "uuid";

const router = express.Router();

// register user
router.post("/", (req, res) => {
  try {
  } catch (error) {
    res.json({
      status: error,
      message: error.message,
    });
  }
});

// verify user account and activate
router.post("/verify-account", (req, res) => {
  try {
  } catch (error) {
    res.json({
      status: error,
      message: error.message,
    });
  }
});

export default router;
