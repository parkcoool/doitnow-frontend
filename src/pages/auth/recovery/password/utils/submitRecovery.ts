import resetPassword from "apis/resetPassword";

import type { SubmitData } from "..";

export default async function submitRecovery(submitData: SubmitData) {
  if (!submitData.emailVerifyToken) throw new Error("이메일 인증에 실패했어요.");

  return await resetPassword({
    email: submitData.email,
    emailVerifyToken: submitData.emailVerifyToken,
    password: submitData.password,
  });
}
