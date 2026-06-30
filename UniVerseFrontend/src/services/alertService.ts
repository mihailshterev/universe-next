import api from "../api/client";

export const getUserNotifications = async (username : string) =>{
  const response = await api.get(`Notification/${username}`);
  return response.data;
}

export const readUserNotifications = async (username : string) =>{
  const response = await api.post(`Notification/${username}/set-read`);
  return response.data;
}
