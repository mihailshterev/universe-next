import api from "../api/client"
import GroupEvent from "../interfaces/GroupEvent";

export const getEvents = async () : Promise<GroupEvent[]> =>{
  const response = await api.get('GroupEvent');
  return response.data;
}

export const getTrendingEvents = async () : Promise<GroupEvent[]> =>{
  const response = await api.get('GroupEvent/trending');
  return response.data;
}

export const getIsAttending = async (eventId : number, username : string) => {
  const response = await api.get(`GroupEvent/${eventId}/is-attending/${username}`);
  return response.data;
}

export const attendEvent = async ({eventId, username} : {eventId: number, username: string}) =>{
  const response = await api.post(`GroupEvent/${eventId}/attend/${username}`);
  return response.data;
}

export const removeAttending = async ({eventId, username} : {eventId: number, username: string}) =>{
  const response = await api.post(`GroupEvent/${eventId}/remove-attending/${username}`);
  return response.data;
}

export const addEvent = async (event : GroupEvent) =>{
  return await api.post('GroupEvent/create-event', event);
}

export const updateEvent = async (event : GroupEvent) =>{
  return await api.patch(`GroupEvent/${event.id}`, event);
}

export const deleteEvent = async (id : number) =>{
  return await api.delete(`GroupEvent/${id}`);
}
