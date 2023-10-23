import axios from "../../../middlewares/http-common";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("/refresh", { withCredentials: true });
    setAuth((prev) => {
      console.log({ "from useRefreshToken 1": JSON.stringify(prev) });
      console.log({ "from uRt ": response.data.accessToken });
      return {
        ...prev,
        sys_role: response.data.sys_role,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};
export default useRefreshToken;
