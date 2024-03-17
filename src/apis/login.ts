import axios from "axios";

import type { APIResponse } from "api";

interface ReqBody {
  email?: string;
  name?: string;
  password: string;
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

export default async function login(body: ReqBody) {
  const response = await axios.post<ResBody>(`${process.env.REACT_APP_API_PATH}/auth/login`, body);
  return response;
}
