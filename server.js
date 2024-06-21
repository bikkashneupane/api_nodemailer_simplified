import express from "express";
import { mongoConnect } from "./src/config/mongoConfig.js";
import userRouter from "./src/routes/userRouter.js";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 8000;

mongoConnect();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/test/users", userRouter);

app.listen(PORT, (error) =>
  error
    ? console.log(error)
    : console.log(`Server running at http://localhost:${PORT}`)
);
