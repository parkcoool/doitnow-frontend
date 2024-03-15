import axios from "axios";

import type { APIResponse } from "api";
import type { Token } from "auth";

interface RefreshTokenBody {
  refreshToken: string;
}

interface RefeshTokenResponse {
  token: {
    refreshToken: Token;
    accessToken: Token;
  } | null;
  id?: number;
  name?: string;
}

/**
 * @path `POST /auth/token`
 * @description 리프레시 토큰을 이용해 액세스 토큰과 리프레시 토큰을 재발급받습니다.
 */
export default async function refershToken(body: RefreshTokenBody) {
  const response = await axios.post<APIResponse<RefeshTokenResponse>>(
    `${process.env.REACT_APP_API_PATH}/auth/token`,
    body
  );

  return response.data;
}
