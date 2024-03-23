import axios from "axios";
import { FriendStatus } from "constant/friendStatus";

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
  friendStatus: FriendStatus | null;
}

export default async function getPublicProfile(query: ReqQuery, accessToken: string) {
  const response = await axios.get<ResBody>(`${process.env.REACT_APP_API_PATH}/user`, {
    params: query,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
}
