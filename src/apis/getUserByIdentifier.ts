import axios from "axios";

import type { APIResponse } from "api";
import type { User } from "user";

interface GetUserByIdentifierBody {
  identifier: string;
}

interface GetUserByIdentifierResponse {
  user: User | null;
}

/**
 * @path `GET /user`
 * @description 식별자를 이용하여 사용자 정보를 가져옵니다.
 */
export default async function getUserByIdentifier(body: GetUserByIdentifierBody) {
  const response = await axios.get<APIResponse<GetUserByIdentifierResponse>>(`${process.env.REACT_APP_API_PATH}/user`, {
    params: body,
  });

  return response.data;
}
