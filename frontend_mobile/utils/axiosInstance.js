import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { store } from "../store/store";
import { setUser } from "../store/authSlice";
import {baseURL} from "./constants"


let authTokens = JSON.parse(store.getState()?.auth?.authTokens);

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${authTokens?.access}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  authTokens = JSON.parse(store.getState().auth.authTokens);
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
