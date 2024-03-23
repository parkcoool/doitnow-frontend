import axios from "axios";

import type { APIResponse } from "api";

interface ReqBody {
  to: number;
}

type ResBody = APIResponse;

export default async function cancelFriendRequest(body: ReqBody, accessToken: string) {
  const response = await axios.post<ResBody>(`${process.env.REACT_APP_API_PATH}/friend/cancel`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
}
