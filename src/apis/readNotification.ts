import axios from "axios";

import type { APIResponse } from "api";

interface ResBody extends APIResponse {
  id?: number;
}

export default async function readNotification(accessToken: string) {
  const response = await axios.patch<ResBody>(`${process.env.REACT_APP_API_PATH}/notification`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
}
