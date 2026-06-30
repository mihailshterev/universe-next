import api from "../api/client";
import Comment from "../interfaces/Comment";
import PostType from "../interfaces/post/PostInterface";

//posts--------------------------
export const getAllPosts = async () =>{
  const response = await api.get(`Post`);
  return response.data;
}

export const getFriendsPosts = async (username : string) =>{
  const response = await api.get(`Post/get-friends-posts/${username}`);
  return response.data;
}

export const getUserPostsCount = async (username : string) =>{
  const response = await api.get(`Post/user/${username}/count`);
  return response.data;
}

export const getPostById = async (postId : number) =>{
  const response = await api.get(`Post/${postId}`);
  return response.data;
}

export const getPostImage = async (id : number) =>{
  const response = await api.get(`Post/${id}/image`, { responseType: 'blob'});
  return response.data;
}

export const addPost = async (post : FormData) =>{
  return await api.post('Post', post, { responseType: 'blob'});
}

export const updatePost = async (post : PostType) =>{
  return await api.put(`Post/${post.id}`, post);
}

export const deletePost = async (postId : number) =>{
  return await api.delete(`Post/${postId}`);
}

//comments-----------------------
export const getPostComments = async (postId : number) : Promise<Comment[]> =>{
  const response = await api.get(`Comment/${postId}/comments`);
  return response.data;
}

export const getCommentReplies = async (commentId : number) : Promise<Comment[]>  =>{
  const response = await api.get(`Comment/${commentId}/replies`);
  return response.data;
}

export const getPostCommentCount = async (postId : number) =>{
  const response = await api.get(`Comment/${postId}/comments/count`);
  return response.data;
}

export const addPostComment = async ({postId, username, content} : {postId: number, username: string, content: string}) =>{
  const commentRequest = {
    postId: postId,
    username: username,
    content: content
  }

  const response = await api.post(`Comment/add-comment`, commentRequest);
  return response.data;
}

export const addCommentReply = async ({commentId, username, content} : {commentId: number, username: string, content: string}) => {
  const commentRequest = {
    postId: -1,
    username: username,
    content: content
  }

  const response = await api.post(`Comment/${commentId}/add-reply`, commentRequest);
  return response.data;
}

//likes--------------------------
export const getPostLikes = async (postId : number) =>{
  const response = await api.get(`Like/post/${postId}/getLikes`);
  return response.data;
}

export const getIsLiked = async (postId : number, username : string) =>{
  const response = await api.get(`Like/post/${postId}/likedBy/${username}`);
  return response.data;
}

export const likePost = async (like : {postId: number, username: string}) =>{
  const response = await api.post(`Like/post/like`, like);
  return response.data;
}

export const unlikePost = async ({postId, username} : {postId: number, username: string}) =>{
  const response = await api.delete(`Like/post/${postId}/unlike`, {
    params: {
      username
    }
  });
    
  return response.data;
}
