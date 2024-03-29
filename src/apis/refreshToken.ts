import axios from "axios";

import type { APIResponse } from "api";

interface ReqBody {
  refreshToken: string;
}

interface ResBody extends APIResponse {
  accessToken: {
    token: string;
    expiresIn: number;
  };
  refreshToken: {
    token: string;
    expiresIn: number;
  };
}

export default async function refershToken(body: ReqBody) {
  const response = await axios.post<ResBody>(`${process.env.REACT_APP_API_PATH}/auth/token`, body);
  return response;
}
