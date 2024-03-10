import axios from "axios";

import type { APIResponse } from "api";

interface SendEmailBody {
  email: string;
}

export interface SendEmailResponse {
  email: string;
  expiresAt: string;
}

/**
 * @path `GET /auth/sendEmail`
 * @description 이메일 주소로 인증 코드 발송을 요청합니다.
 */
export default async function sendEmail(body: SendEmailBody) {
  const response = await axios.post<APIResponse<SendEmailResponse>>(
    `${process.env.REACT_APP_API_PATH}/auth/sendEmail`,
    body
  );

  return response.data;
}
