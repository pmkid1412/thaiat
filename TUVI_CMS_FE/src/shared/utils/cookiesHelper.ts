import Cookies from "universal-cookie";

import { ROUTES, TOKEN } from "../constants";

type AuthTokenType = typeof TOKEN.ACCESS | typeof TOKEN.REFRESH;

const cookie = new Cookies();
const oneYearInSecond = 60 * 60 * 24 * 365;

export const getTokenFromCookie = (parameter: AuthTokenType) => {
  return cookie.get(parameter);
};

export const saveTokenToCookie = (
  accessToken: string,
  refreshToken: string
) => {
  cookie.set(TOKEN.ACCESS, accessToken, {
    path: ROUTES.HOME,
    maxAge: oneYearInSecond,
  });
  cookie.set(TOKEN.REFRESH, refreshToken, {
    path: ROUTES.HOME,
    maxAge: oneYearInSecond,
  });
};

export const removeTokensFromCookie = () => {
  cookie.remove(TOKEN.ACCESS, { path: ROUTES.HOME });
  cookie.remove(TOKEN.REFRESH, { path: ROUTES.HOME });
};
