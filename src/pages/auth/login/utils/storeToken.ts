import Cookies from "js-cookie";

import type { SessionValues, SessionMethods } from "contexts/useSessionStore";
import type { Token } from "auth";

export default function storeToken(
  sessionStore: SessionValues & SessionMethods,
  accessToken?: Token,
  refreshToken?: Token
) {
  if (!accessToken || !refreshToken) throw new Error("로그인에 실패했어요.");

  sessionStore.setAccessToken(accessToken);
  Cookies.set("refreshToken", refreshToken.token, {
    expires: refreshToken.expiresIn,
    secure: process.env.NODE_ENV === "production",
  });
}
