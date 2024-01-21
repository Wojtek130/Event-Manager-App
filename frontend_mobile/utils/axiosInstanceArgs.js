import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { setUser } from "../store/authSlice";
import { baseURL } from "./constants";

export const axiosInstanceArgs = (getState, dispatch) => {
  let authTokens = JSON.parse(getState()?.auth?.authTokens);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    authTokens = JSON.parse(getState().auth.authTokens);
    const parsedAuthTokens = JSON.parse(authTokens);
    req.headers.Authorization = `Bearer ${parsedAuthTokens?.access}`;

    const tokenData = jwtDecode(parsedAuthTokens.access);

    const expirationDate = dayjs.unix(tokenData.exp);
    const nowDate = dayjs();
    const isExpired = expirationDate.isBefore(nowDate);

    if (!isExpired) {
      return req;
    }
    try {
      const response = await axios.post(`${baseURL}/auth/token/refresh/`, {
        refresh: parsedAuthTokens.refresh,
      });
      dispatch(
        setUser({
          authTokens: JSON.stringify(response.data),
        })
      );
      const pt = JSON.parse(JSON.parse(getState().auth.authTokens));
      req.headers.Authorization = `Bearer ${pt.access}`;
    } catch (error) {
      console.error(error);
    }
    return req;
  });
  return axiosInstance;
};

export default axiosInstanceArgs;
