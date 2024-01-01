


export const intereceptorFunction = async (req) => {
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
    req.headers.Authorization = `Bearer ${response.data.access}`;
  } catch (error) {
    console.error(error);
  }
  return req;
};
