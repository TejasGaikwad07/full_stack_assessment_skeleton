import express from "express";
import userRouter from "./routes/user";
import homeRouter from "./routes/home";
import cors from "cors";
const app = express();
app.use(cors());

app.use(express.json());

app.use("/user", userRouter);
app.use("/home", homeRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
