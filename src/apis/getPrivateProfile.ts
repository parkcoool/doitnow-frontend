import axios from "axios";

import type { APIResponse } from "api";

interface ResBody extends APIResponse {
  id: number;
  username: string;
  name: string;
  bio: string | null;
  createdAt: string;
  profileImage: string | null;
  email: string;
}

export default async function getPrivateProfile(accessToken: string) {
  const response = await axios.get<ResBody>(`${process.env.REACT_APP_API_PATH}/user/private`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
}
