import axios from "axios";

import type { APIResponse } from "api";

interface ResBody extends APIResponse {
  count: number;
}

export default async function getNotificationCount(accessToken: string) {
  const response = await axios.get<ResBody>(`${process.env.REACT_APP_API_PATH}/notification/count`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
}
