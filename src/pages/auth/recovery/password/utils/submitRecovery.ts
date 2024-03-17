import updatePrivateProfile from "apis/updatePrivateProfile";

import type { SubmitData } from "..";

export default async function submitRecovery(submitData: SubmitData) {
  if (!submitData.emailVerifyToken || !submitData.id) throw new Error("이메일 인증에 실패했어요.");

  const updatePrivateProfileRes = await updatePrivateProfile(
    { password: submitData.password },
    submitData.emailVerifyToken.token
  );

  if (updatePrivateProfileRes.status !== 200) throw new Error(updatePrivateProfileRes.data.message);
  
}
