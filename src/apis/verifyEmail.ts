import axios from "axios";

import type { APIResponse } from "api";

interface ReqBody {
  email: string;
  code: string;
}

interface ResBody extends APIResponse {
  token: {
    token: string;
    expiresIn: number;
  };
}

export default async function verifyEmail(body: ReqBody) {
  const response = await axios.post<ResBody>(`${process.env.REACT_APP_API_PATH}/auth/email/verify`, body);
  return response;
}
