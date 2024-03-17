import getPublicProfile from "apis/getPublicProfile";

import type { ReceivedData } from "../";

export default async function handleIdentifierSubmit(identifier: string): Promise<Partial<ReceivedData>> {
  const isIdentifierEmail = identifier.includes("@");
  const reqBody = isIdentifierEmail ? { email: identifier } : { name: identifier };

  const res = await getPublicProfile(reqBody);
  if (res.status !== 200) throw new Error(res.data.message);

  return {
    id: res.data.id,
    name: res.data.name,
    username: res.data.username,
  };
}
