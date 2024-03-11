import axios from "axios";

import type { APIResponse } from "api";

interface VerifyEmailBody {
  email: string;
  code: string;
}

export interface VerifyEmailResponse {
  token: string | null;
}

/**
 * @path `POST /auth/verifyEmail`
 * @description 이메일 주소로 발송된 인증 코드를 검증합니다.
 */
export default async function verifyEmail(body: VerifyEmailBody) {
  const response = await axios.post<APIResponse<VerifyEmailResponse>>(
    `${process.env.REACT_APP_API_PATH}/auth/verifyEmail`,
    body
  );

  return response.data;
}
