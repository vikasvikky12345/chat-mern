import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { errorHandler } from "../utilis/errorHandler.js";

export const messageController = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    console.log(senderId);
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      const newConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    return res.status(201).json({ message: "message created succesfuuly" });
  } catch (error) {
    console.log("message error", error.message);
    next(error);
  }
};
export const getMessages = async (req, res, next) => {
  try {
    const { id } = req.params;
    const senderId = req.user._id;
    console.log(senderId);
    if (!senderId) next(errorHandler(401, "Unauthorized, user ID not found"));
    console.log("User to Chat ID:", id);
    console.log("Sender ID:", senderId);
    console.log(req.user._id);
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, id] },
    }).populate("messages");
    if (!conversation) {
      next(errorHandler(401, "conversation not found"));
    }
    const messages = conversation.messages;
    return res.status(201).json(messages);
  } catch (error) {
    next(error);
  }
};
