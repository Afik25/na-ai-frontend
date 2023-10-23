import { axiosPrivate } from "../../../middlewares/http-common";
import useAuth from "./useAuth";
import { LOGOUT } from "../../../routes";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const dates = new Date();
      const data = { updated_at: dates };
      const response = await axiosPrivate.get(LOGOUT, data, {
        withCredentials: true,
      });
      console.log({ "response from server token trouvé ": response?.data });
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
};
export default useLogout;
