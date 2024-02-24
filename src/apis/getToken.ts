import axios from "axios";

import type { APIResponse, AuthProvider } from "api";

interface GetTokenBody {
  authProvider: AuthProvider;
  code: string;
}

interface GetTokenResponse {
  accessToken: {
    token: string;
    expiresAt: string;
  };
  refreshToken: {
    token: string;
    expiresAt: string;
  };
}

/**
 * @path `GET /auth`
 * @description 인가 코드를 이용하여 액세스 토큰과 리프레시 토큰을 발급받습니다.
 */
export default async function getToken(body: GetTokenBody) {
  const response = await axios.post<APIResponse<GetTokenResponse>>("/auth", body);

  return response.data;
}
