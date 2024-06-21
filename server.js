import express from "express";
import { mongoConnect } from "./src/config/mongoConfig.js";
import userRouter from "./src/routes/userRouter.js";

const app = express();
const PORT = process.env.PORT || 8000;

mongoConnect();

app.use("/test/users", userRouter);

app.listen(PORT, (error) =>
  error
    ? console.log(error)
    : console.log(`Server running at http://localhost:${PORT}`)
);
