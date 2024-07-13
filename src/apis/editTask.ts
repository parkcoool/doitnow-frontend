import axios from "axios";

import type { APIResponse } from "api";

interface ReqBody {
  id: number;
  title?: string;
  startAt?: string;
  due?: string;
  done?: boolean;
}

type ResBody = APIResponse;

export default async function editTask(body: ReqBody, accessToken: string) {
  const response = await axios.patch<ResBody>(
    `${process.env.REACT_APP_API_PATH}/task`,
    body,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
}
