import sendEmail from "apis/sendEmail";
import getUserByIdentifier from "apis/getUserByIdentifier";

import type { ReceivedData } from "../";

export default async function handleEmailSubmit(email: string): Promise<Partial<ReceivedData>> {
  // 이메일 중복 확인
  const getUserByIndentifierRes = await getUserByIdentifier({
    identifier: email,
  });

  if (getUserByIndentifierRes.code === 1000) throw new Error("이메일이 이미 사용되고 있습니다.");
  else if (getUserByIndentifierRes.code !== 1001) throw new Error(getUserByIndentifierRes.message);

  // 이메일 인증 메일 발송
  const sendEmailRes = await sendEmail({ email });

  if (sendEmailRes.code !== 1000) throw new Error(sendEmailRes.message);

  return { emailCodeExpiresAt: new Date(sendEmailRes.result.expiresAt) };
}
