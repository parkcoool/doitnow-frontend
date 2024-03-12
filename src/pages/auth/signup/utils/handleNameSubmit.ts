import getUserByIdentifier from "apis/getUserByIdentifier";

import type { SignupData } from "../";

export default async function handleNameSubmit(name: string): Promise<Partial<SignupData>> {
  // 아이디 유효성 검사
  if (/\W/.test(name) === true) throw new Error("영어, 숫자, 밑줄(_)만 쓸 수 있어요.");
  if (name.length < 3 || name.length > 20) throw new Error("3자 이상 20자 이하여야 해요.");

  // 아이디 중복 확인
  const getUserByIndentifierRes = await getUserByIdentifier({
    identifier: name,
  });

  if (getUserByIndentifierRes.code === 1000) throw new Error("아이디가 이미 사용되고 있습니다.");
  else if (getUserByIndentifierRes.code !== 1001) throw new Error(getUserByIndentifierRes.message);

  return {};
}
