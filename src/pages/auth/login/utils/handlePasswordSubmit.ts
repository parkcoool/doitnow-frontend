import getToken from "apis/getToken";

import type { ReceivedData, SubmitData } from "../";

export default async function handlePasswordSubmit(submitData: SubmitData): Promise<Partial<ReceivedData>> {
  const res = await getToken(submitData);

  const { token } = res.result;
  if (res.code !== 1000 || !token) throw new Error(res.message);

  return {
    token,
  };
}
