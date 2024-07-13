import axios from "axios";

import type { APIResponse } from "api";

interface ReqQuery {
  done: boolean;
}

interface ResBody extends APIResponse {
  count: number;
}

export default async function getTaskCount(
  query: ReqQuery,
  accessToken: string
) {
  const response = await axios.get<ResBody>(
    `${process.env.REACT_APP_API_PATH}/task/count`,
    {
      params: query,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
}
