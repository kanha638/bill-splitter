import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);

import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import eventsRoutes from "./routes/events";
import expenseRoutes from "./routes/expense";

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/event", eventsRoutes);
app.use("/api/expense", expenseRoutes);

app.get("/", (_, res) => res.send("Hello From Bill Splitter Backend"));
app.listen(PORT, async () => {
  console.log(`Server running at PORT:${PORT}`);

  try {
    console.log("Database has been connected Connected !!");
  } catch (err) {
    console.log(err);
  }
});
