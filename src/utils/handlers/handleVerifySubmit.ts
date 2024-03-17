import verifyEmail from "apis/verifyEmail";

export default async function handleVerifySubmit(email: string, code: string) {
  // 이메일 인증 코드 확인 및 토큰 발급
  const verifyEmailRes = await verifyEmail({
    email,
    code,
  });

  if (verifyEmailRes.status !== 200) throw new Error(verifyEmailRes.data.message);

  return { emailVerifyToken: verifyEmailRes.data.token };
}
