import { Prisma } from "@prisma/client";
import { client } from "../../prisma/prisma";
import { AddMessageDto } from "../dto/message.dto";

async function getAllMessages() {
  try {
    const messages = await client.message.findMany();
    return { fetched: true, messages: messages };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return { fetched: false, message: e };
    } else {
      return { fetched: false, message: e };
    }
  }
}

async function postMessage(messageData: AddMessageDto) {
  try {
    const message = await client.message.create({
      data: {
        senderName: messageData.senderName,
        senderEmail: messageData.senderEmail,
        message: messageData.message,
      },
    });
    return { added: true, message: message };
  } catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return { added: false, message: e };
    } else {
      return { added: false, message: e };
    }
  }
}

export { getAllMessages, postMessage };