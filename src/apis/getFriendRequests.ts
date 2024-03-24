import axios from "axios";

import type { APIResponse } from "api";

interface ReqQuery {
  offset?: number;
}

interface ResBody extends APIResponse {
  friendRequests: {
    from: number;
    createdAt: string;
  }[];
  hasMore: boolean;
}

export default async function getFriendRequests(query: ReqQuery, accessToken: string) {
  const response = await axios.get<ResBody>(`${process.env.REACT_APP_API_PATH}/friend/request`, {
    params: query,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
}
