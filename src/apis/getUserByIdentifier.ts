import axios from "axios";

import type { APIResponse } from "api";
import type { User } from "user";

interface GetUserByIdentifierParams {
  identifier: string;
}

interface GetUserByIdentifierResponse {
  user: (User & Required<Pick<User, "email">>) | null;
}

/**
 * @path `GET /user`
 * @description 식별자를 이용하여 사용자 정보를 가져옵니다.
 */
export default async function getUserByIdentifier(params: GetUserByIdentifierParams) {
  const response = await axios.get<APIResponse<GetUserByIdentifierResponse>>(`${process.env.REACT_APP_API_PATH}/user`, {
    params,
  });

  return response.data;
}
