import axios from "axios";

import type { APIResponse } from "api";

interface ReqQuery {
  offset?: number;
}

interface ResBody extends APIResponse {
  friends: {
    id: number;
    username: string;
    name: string;
    profileImage: string | null;
    bio: string | null;
  }[];
  hasMore: boolean;
}

export default async function getFriends(query: ReqQuery, accessToken: string) {
  const response = await axios.get<ResBody>(`${process.env.REACT_APP_API_PATH}/friend`, {
    params: query,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
}
