import express, { Router, Request, Response } from "express";
import { getAllMessages, postMessage } from "./message.service";

const messageRouter: Router = express.Router();

messageRouter.get("/", async (req: Request, res: Response) => {
  const response = await getAllMessages();
  if (response.fetched) {
    res.status(200).json({ messages: response.messages });
  } else {
    res
      .status(500)
      .json({ error: "Failed to fetch messages", details: response.error });
  }
});

messageRouter.post("/post", async (req: Request, res: Response) => {
  const response = await postMessage(req.body);
  if (response.added) {
    res.status(201).json(response.message);
  } else {
    res
      .status(500)
      .json({ error: "Failed to add message", details: response.error });
  }
});

export default messageRouter;
