import axios from "axios";

import type { APIResponse } from "api";

interface ReqBody {
  to: number;
}

type ResBody = APIResponse;

export default async function requestFriend(body: ReqBody, accessToken: string) {
  const response = await axios.post<ResBody>(`${process.env.REACT_APP_API_PATH}/friend`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
}
