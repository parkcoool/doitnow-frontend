import axios from "axios";

import type { APIResponse } from "api";

interface ReqBody {
  title: string;
  startAt: string;
  due?: string;
}

type ResBody = APIResponse;

export default async function createTask(body: ReqBody, accessToken: string) {
  const response = await axios.post<ResBody>(
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
