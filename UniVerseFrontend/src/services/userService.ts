import api from "../api/client";
import UserRegistrationRequest from "../interfaces/user/UserRegistrationRequest";

export const getUsers = async () =>{
  const response = await api.get('User');
  return response.data;
}

export const getUsersByFilter = async (filter : string) =>{
  const response = await api.get(`User/search/${filter}`);
  return response.data;
}

export const userExists = async (username : string) =>{
  const response = await api.get(`User/exists/${username}`);
  return response.data;
}

export const getUserByName = async (username : string) =>{
  const response = await api.get(`User/${username}`);
  return response.data;
}

export const getUserOnlineFriends = async (username : string) : Promise<string[]> =>{
  const response = await api.get(`Friendship/${username}/online-friends`);
  return response.data;
}

export const getUserFriendsCount = async (username : string) =>{
  const response = await api.get(`Friendship/${username}/count`);
  return response.data;
}

export const getUserProfilePicture = async (username : string) =>{
  const response = await api.get(`User/${username}/profile-picture`, { responseType: 'blob'});
  return response.data;
}

export const getUserFriendRequests = async (username : string) =>{
  const response = await api.get(`Friendship/${username}/friend-requests`);
  return response.data;
}

export const checkFriendship = async (user1Name : string, user2Name : string) => {
  const response = await api.get('Friendship/check-friendship', {
    params: {
      user1Name,
      user2Name,
    },
  });

  return response.data;
};

export const addFriend = async ({ loggedInUser, profileUser } : {loggedInUser: string, profileUser: string}) =>{
  const response = await api.post(`Friendship/${loggedInUser}/add-friend/${profileUser}`);
  return response.data;
}

export const acceptFriendRequest = async (friendshipId : number) =>{
  const response = await api.post(`Friendship/accept-friend-request/${friendshipId}`);
  return response.data;
}

export const removeFriend = async ({ loggedInUser, profileUser } : {loggedInUser: string, profileUser: string}) =>{
  const response = await api.delete(`Friendship/${loggedInUser}/remove-friend/${profileUser}`);
  return response.data;
}

export const rejectFriendRequest = async (friendshipId : number) =>{
  const response = await api.delete(`Friendship/reject-friend-request/${friendshipId}`);
  return response.data;
}

export const confirmPassword = async ({ username, password } : {username: string, password: string}) =>{
  const details = { username: username, email: "", password: password };

  const response = await api.post('Auth/confirm-password', details);
  return response.data;
}

export const updateUserProfile = async (data : FormData) =>{
  const response = await api.post('User/update-profile', data);
  return response.data;
}

export const getUserRegistrationRequests = async () : Promise<UserRegistrationRequest[]> =>{
  const response = await api.get('User/registration-requests')
  return response.data;
}

export const approveUser = async (username : string) => {
  const response = await api.put(`User/${username}/approve`);
  return response.data;
}

export const rejectUser = async (username : string) => {
  const response = await api.delete(`User/${username}/reject`);
  return response.data;
}
