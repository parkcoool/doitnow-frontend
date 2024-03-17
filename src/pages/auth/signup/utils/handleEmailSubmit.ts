import getPublicProfile from "apis/getPublicProfile";
import sendEmail from "apis/sendEmail";

export default async function handleEmailSubmit(email: string) {
  // 이메일이 존재하는지 확인
  const getPublicProfileRes = await getPublicProfile({ email });
  if (getPublicProfileRes.status === 200) throw new Error("이메일 주소가 이미 사용 중이에요.");
  else if (getPublicProfileRes.status !== 404) throw new Error(getPublicProfileRes.data.message);

  // 이메일 인증 메일 발송
  const sendEmailRes = await sendEmail({ email });
  if (sendEmailRes.status !== 200) throw new Error(sendEmailRes.data.message);

  return { emailCodeExpiresAt: sendEmailRes.data.expiresAt };
}
