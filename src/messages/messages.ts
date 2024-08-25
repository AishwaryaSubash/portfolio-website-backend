import express, { Router, Request, Response } from "express";
import { getAllMessages, postMessage } from "./message.service";

const messageRouter: Router = express.Router();

messageRouter.get("/", async (req: Request, res: Response) => {
  const messages = await getAllMessages();
  res.status(201).json(messages);
});

messageRouter.post("/post", async (req: Request, res: Response) => {
  const message = await postMessage(req.body);
  res.status(201).json(message);
});

export default messageRouter;
