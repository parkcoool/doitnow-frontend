import getUserByIdentifier from "apis/getUserByIdentifier";

import type { ReceivedData } from "../";

export default async function handleIdentifierSubmit(identifier: string): Promise<Partial<ReceivedData>> {
  const res = await getUserByIdentifier({
    identifier,
  });

  if (res.code !== 1000 || !res.result.user) throw new Error(res.message);

  return {
    id: res.result.user.id,
    name: res.result.user.name,
  };
}
