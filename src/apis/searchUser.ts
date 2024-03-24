import axios from "axios";

import type { APIResponse } from "api";

interface ReqQuery {
  query: string;
}

interface ResBody extends APIResponse {
  users: {
    id: number;
    name: string;
    username: string;
    profileImage: string | null;
  }[];
}

export default async function searchUser(query: ReqQuery, accessToken: string) {
  const response = await axios.get<ResBody>(`${process.env.REACT_APP_API_PATH}/user/search`, {
    params: query,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}
