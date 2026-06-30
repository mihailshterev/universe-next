import api from "../api/client";
import Message from "../interfaces/Message";

export const getChats = async (username : string) => {
  const response = await api.get('Chat/get-user-chats', {
    params: {
      username
    }
  });

  return response.data;
}

export const getChat = async (user : string, chatUser: string) : Promise<Message[]> => {
  const response = await api.get('Chat/get-messages', {
    params: {
     user: user,
     chatUser: chatUser
    }
  });

  return response.data;
}
