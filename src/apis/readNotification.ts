import axios from "axios";

import type { APIResponse } from "api";

interface ReqBody {
  id?: number[];
}

type ResBody = APIResponse;

export default async function readNotification(reqBody: ReqBody, accessToken: string) {
  const response = await axios.patch<ResBody>(`${process.env.REACT_APP_API_PATH}/notification`, reqBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
}
