import axios from "axios";

import type { APIResponse } from "api";

interface CreateUserBody {
  email: string;
  emailToken: string;
  password: string;
  name: string;
}

/**
 * @path `POST /user`
 * @description 사용자를 생성합니다.
 */
export default async function createUser(body: CreateUserBody) {
  const response = await axios.post<APIResponse<undefined>>(`${process.env.REACT_APP_API_PATH}/user`, body);

  return response.data;
}
