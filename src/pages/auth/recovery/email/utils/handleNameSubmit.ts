import getUserByIdentifier from "apis/getUserByIdentifier";

import type { ReceivedData } from "../";

export default async function handleNameSubmit(name: string): Promise<Partial<ReceivedData>> {
  // 아이디 유효성 검사
  if (/\W/.test(name) === true) throw new Error("영어, 숫자, 밑줄(_)만 쓸 수 있어요.");
  if (name.length < 3 || name.length > 20) throw new Error("3자 이상 20자 이하여야 해요.");

  const getUserByIndentifierRes = await getUserByIdentifier({
    identifier: name,
  });

  const { user } = getUserByIndentifierRes.result;

  if (getUserByIndentifierRes.code !== 1000 || user === null) throw new Error(getUserByIndentifierRes.message);

  return {
    email: user.email,
  };
}
