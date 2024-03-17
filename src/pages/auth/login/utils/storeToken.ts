import Cookies from "js-cookie";

import type { SessionValues, SessionMethods } from "contexts/useSessionStore";

export default function storeToken(
  sessionStore: SessionValues & SessionMethods,
  accessToken: {
    token: string;
    expiresIn: number;
  },
  refreshToken: {
    token: string;
    expiresIn: number;
  }
) {
  sessionStore.setAccessToken(accessToken);
  Cookies.set("refreshToken", refreshToken.token, {
    expires: refreshToken.expiresIn,
    secure: process.env.NODE_ENV === "production",
  });
}
