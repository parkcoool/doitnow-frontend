import axios from "axios";

import type { APIResponse } from "api";

interface ReqQuery {
  id?: number;
}

type ResBody = APIResponse;

export default async function deleteNotification(reqQuery: ReqQuery, accessToken: string) {
  const response = await axios.delete<ResBody>(`${process.env.REACT_APP_API_PATH}/notification`, {
    params: reqQuery,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
}
