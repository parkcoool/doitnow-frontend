import axios from "axios";

import type { APIResponse } from "api";

interface ReqQuery {
  offset?: number;
  orderBy?: "createdAt" | "due";
  onlyUndone?: boolean;
}

interface ResBody extends APIResponse {
  hasMore: boolean;
  tasks: {
    id: number;
    creator: number;
    title: string;
    done: boolean;
    due?: string;
    startAt?: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export default async function getTasks(
  query: ReqQuery,
  accessToken: string
) {
  const response = await axios.get<ResBody>(
    `${process.env.REACT_APP_API_PATH}/task`,
    {
      params: query,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
}
