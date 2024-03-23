import axios from "axios";

import type { APIResponse } from "api";

interface ReqQuery {
  to: number;
}

type ResBody = APIResponse;

export default async function deleteFriend(query: ReqQuery, accessToken: string) {
  const response = await axios.delete<ResBody>(`${process.env.REACT_APP_API_PATH}/friend`, {
    params: query,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
}
