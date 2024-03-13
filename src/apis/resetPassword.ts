import axios from "axios";

import type { APIResponse } from "api";

interface ResetPasswordBody {
  emailToken?: string;
  id: number;
  user: Partial<{
    email: string;
    password: string;
    name: string;
  }>;
}

/**
 * @path `PATCH /user`
 * @description 사용자의 비밀번호를 재설정합니다.
 */
export default async function resetPassword(body: ResetPasswordBody) {
  const response = await axios.patch<APIResponse<undefined>>(`${process.env.REACT_APP_API_PATH}/user`, body);

  return response.data;
}
