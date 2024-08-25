import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import visitorRouter from "./src/visitors/visitors";
import messageRouter from "./src/messages/messages";

const app = express();
const router = express.Router();
dotenv.config();

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());

app.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});

app.get("/", function (req, res) {
  res.send("Hello there!");
});

app.use("/visitor", visitorRouter);
app.use("/message", messageRouter);

// app.post("/visitor", visitorTracker);
