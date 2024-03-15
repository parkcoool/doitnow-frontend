import sendEmail from "apis/sendEmail";
import getUserByIdentifier from "apis/getUserByIdentifier";

export default async function handleEmailSubmit(email: string) {
  // 이메일 중복 확인
  const getUserByIndentifierRes = await getUserByIdentifier({
    identifier: email,
  });

  const { user } = getUserByIndentifierRes.result;

  if (getUserByIndentifierRes.code !== 1000 || !user) throw new Error(getUserByIndentifierRes.message);

  // 이메일 인증 메일 발송
  const sendEmailRes = await sendEmail({ email });
  if (sendEmailRes.code !== 1000) throw new Error(sendEmailRes.message);

  return { emailCodeExpiresAt: new Date(sendEmailRes.result.expiresAt), id: user.id };
}