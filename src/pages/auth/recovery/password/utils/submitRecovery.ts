import resetPassword from "apis/resetPassword";

import type { SubmitData } from "..";

export default async function submitRecovery(submitData: SubmitData) {
  console.log(submitData);
  if (!submitData.emailVerifyToken || !submitData.id) throw new Error("이메일 인증에 실패했어요.");

  return await resetPassword({
    emailToken: submitData.emailVerifyToken.token,
    id: submitData.id,
    user: {
      password: submitData.password,
    },
  });
}
