import signup from "apis/signup";

import type { SubmitData } from "..";

export default async function submitSignup(submitData: SubmitData) {
  const { password, username, name, emailVerifyToken } = submitData;
  if (emailVerifyToken === undefined) throw new Error("이메일 인증에 실패했어요.");

  await signup({ password, username, name }, emailVerifyToken.token);
}
