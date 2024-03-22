import axios from "axios";

import type { APIResponse } from "api";

interface ReqQuery {
  offsetDate?: string;
}

interface ResBody extends APIResponse {
  notifications: {
    id: number;
    text: string;
    link: string;
    type: string;
    read: boolean;
    createdAt: string;
  }[];
}

export default async function getNotifications(query: ReqQuery, accessToken: string) {
  const response = await axios.get<ResBody>(`${process.env.REACT_APP_API_PATH}/notification`, {
    params: query,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
}
