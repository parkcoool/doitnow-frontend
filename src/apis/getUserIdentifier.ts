import axios from "axios";

import type { APIResponse } from "api";

interface ReqQuery {
  name?: string;
  email?: string;
  id?: number;
}

interface ResBody extends APIResponse {
  id: number;
  username: string;
  name: string;
}

export default async function getUserIdentifier(query: ReqQuery) {
  const response = await axios.get<ResBody>(`${process.env.REACT_APP_API_PATH}/user/identifier`, { params: query });
  return response;
}
