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
  bio: string | null;
  createdAt: string;
  profileImage: string | null;
  isFriend: boolean;
}

export default async function getPublicProfile(query: ReqQuery, accessToken: string) {
  const response = await axios.get<ResBody>(`${process.env.REACT_APP_API_PATH}/user`, {
    params: query,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}
