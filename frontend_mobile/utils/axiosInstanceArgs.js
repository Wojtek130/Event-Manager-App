import axios from "axios";
import { setUser } from "../store/authSlice";
import { baseURL } from "./constants";
import { isTokenExpired } from "./functions";

export const axiosInstanceArgs = (getState, dispatch) => {
  let tokens = JSON.parse(getState()?.auth?.authTokens);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${tokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    tokens = JSON.parse(getState().auth.authTokens);
    const parsedAuthTokens = JSON.parse(tokens);
    req.headers.Authorization = `Bearer ${parsedAuthTokens?.access}`;

    if (!isTokenExpired(parsedAuthTokens)) {
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
