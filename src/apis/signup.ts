import axios from "axios";

import type { APIResponse } from "api";

interface ReqBody {
  password: string;
  username: string;
  name: string;
}

type ResBody = APIResponse;

export default async function signup(body: ReqBody, emailToken: string) {
  const response = await axios.post<ResBody>(`${process.env.REACT_APP_API_PATH}/user`, body, {
    headers: {
      Authorization: `Bearer ${emailToken}`,
    },
  });
  return response;
}
