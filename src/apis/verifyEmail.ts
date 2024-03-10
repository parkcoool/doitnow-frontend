import axios from "axios";

import type { APIResponse } from "api";

interface VerifyEmailParams {
  email: string;
}

/**
 * @path `GET /auth/email`
 * @description 이메일 주소로 인증 코드 발송을 요청합니다.
 */
export default async function getToken(body: VerifyEmailParams) {
  const response = await axios.post<APIResponse<undefined>>(`${process.env.REACT_APP_API_PATH}/auth/email`, body);

  return response.data;
}
