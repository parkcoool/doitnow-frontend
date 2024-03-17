import axios from "axios";

import type { APIResponse } from "api";

interface ReqBody {
  email: string;
}

interface ResBody extends APIResponse {
  email: string;
  expiresAt: string;
}

export default async function sendEmail(body: ReqBody) {
  const response = await axios.post<ResBody>(`${process.env.REACT_APP_API_PATH}/auth/email/send`, body);
  return response;
}
