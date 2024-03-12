import createUser from "apis/createUser";

import type { SubmitData } from "..";

export default async function submitSignup(submitData: SubmitData) {
  if (!submitData.emailVerifyToken) throw new Error("이메일 인증에 실패했어요.");

  return await createUser({
    email: submitData.email,
    name: submitData.name,
    password: submitData.password,
    emailToken: submitData.emailVerifyToken.token,
  });
}
