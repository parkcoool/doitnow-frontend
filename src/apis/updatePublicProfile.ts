import axios from "axios";

import type { APIResponse } from "api";

interface ReqBody {
  username?: string;
  name?: string;
  bio?: string | null;
  profileImage?: string | null;
}

type ResBody = APIResponse;

export default async function updatePublicProfile(body: ReqBody, accessToken: string) {
  const response = await axios.patch<ResBody>(`${process.env.REACT_APP_API_PATH}/user`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
}
