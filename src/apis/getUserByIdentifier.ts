import axios from "axios";

import type { APIResponse } from "api";

interface GetUserByIdentifierParams {
  identifier: string;
}

interface GetUserByIdentifierResponse {
  user: {
    id: number;
    email: string;
    name: string;
    bio: string | null;
    createdAt: string;
    profileImage: string | null;
  } | null;
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
