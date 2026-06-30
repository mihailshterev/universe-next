import api from "../../api/client";
import { useSocket } from "../useSocket";
import useAuth from "./useAuth";

const useLogout = () =>{
  const { auth, setAuth } = useAuth();
  const { sendIsOnlineAlert } = useSocket();

  const logout = async () => {
    sendIsOnlineAlert(auth?.username);

    setAuth({}); 
    try{
      await api.post('Auth/logout', {});
    }catch(error){
      console.log(error);
    }
  }

  return logout;
}

export default useLogout;
