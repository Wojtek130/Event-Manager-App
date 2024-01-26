import axios from "axios";
import { store } from "../store/store";
import { setUser } from "../store/authSlice";
import {baseURL} from "./constants"
import { isTokenExpired } from "./functions";


let tokens = JSON.parse(store.getState()?.auth?.authTokens);

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${tokens?.access}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  tokens = JSON.parse(store.getState().auth.authTokens);
  const parsedAuthTokens = JSON.parse(tokens);
  req.headers.Authorization = `Bearer ${parsedAuthTokens?.access}`;

  if (!isTokenExpired(parsedAuthTokens)) {
    return req;
  }
  try {
    const response = await axios.post(`${baseURL}/auth/token/refresh/`, {
      refresh: parsedAuthTokens.refresh,
    });
    store.dispatch(
      setUser({
        authTokens: JSON.stringify(response.data),
      })
    );
    // req.headers.Authorization = `Bearer ${response.data.access}`;
    const pt = JSON.parse(JSON.parse(store.getState().auth.authTokens));
    req.headers.Authorization = `Bearer ${pt.access}`;
  } catch (error) {
    console.error(error);
  }
  return req;
});

export default axiosInstance;
