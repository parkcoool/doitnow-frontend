import axios from "axios";

import type { APIResponse } from "api";

interface ReqBody {
  email?: string;
  password?: string;
}

type ResBody = APIResponse;

export default async function updatePrivateProfile(body: ReqBody, emailToken: string) {
  const response = await axios.patch<ResBody>(`${process.env.REACT_APP_API_PATH}/user/private`, body, {
    headers: {
      Authorization: `Bearer ${emailToken}`,
    },
  });
  return response;
}
