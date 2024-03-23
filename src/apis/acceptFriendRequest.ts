import axios from "axios";

import type { APIResponse } from "api";

interface ReqBody {
  from: number;
}

type ResBody = APIResponse;

export default async function acceptFriendRequest(body: ReqBody, accessToken: string) {
  const response = await axios.post<ResBody>(`${process.env.REACT_APP_API_PATH}/friend/accept`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
}
