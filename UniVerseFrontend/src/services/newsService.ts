import api from "../api/client";

export const getNews = async () =>{
  const response = await api.get('News');
  return response.data;
}

export const getNewsImage = async (id : number) =>{
  const response = await api.get(`News/${id}/image`, { responseType: 'blob'});
  return response.data;
}

export const getNewsById = async (newsId : number) =>{
  const response = await api.get(`News/${newsId}`);
  return response.data;
}

export const addNews = async (news : FormData) =>{
  return await api.post('News/create-news', news);
}

export const updateNews = async (data : FormData) =>{
  return await api.post(`News/update`, data);
}

export const deleteNews = async (newsId : number) =>{
  return await api.delete(`News/delete/${newsId}`);
}
