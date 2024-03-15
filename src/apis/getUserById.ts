import axios from "axios";

import type { APIResponse } from "api";

interface GetUserByIdParams {
  id: number;
}

interface GetUserByIdResponse {
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
 * @description id를 이용하여 사용자 정보를 가져옵니다.
 */
export default async function getUserByIdentifier(params: GetUserByIdParams) {
  const response = await axios.get<APIResponse<GetUserByIdResponse>>(`${process.env.REACT_APP_API_PATH}/user`, {
    params,
  });

  return response.data;
}
