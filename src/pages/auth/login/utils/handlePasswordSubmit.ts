import login from "apis/login";

import type { ReceivedData, SubmitData } from "../";

export default async function handlePasswordSubmit(submitData: SubmitData): Promise<Partial<ReceivedData>> {
  const isIdentifierEmail = submitData.identifier.includes("@");
  const reqBody = {
    password: submitData.password,
    ...(isIdentifierEmail ? { email: submitData.identifier } : { name: submitData.identifier }),
  };

  const res = await login(reqBody);
  if (res.status !== 200) throw new Error(res.data.message);

  return {
    token: { accessToken: res.data.accessToken, refreshToken: res.data.refreshToken },
  };
}
