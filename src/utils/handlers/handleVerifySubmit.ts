import verifyEmail from "apis/verifyEmail";

export default async function handleVerifySubmit(email: string, code: string) {
  // 이메일 인증 코드 확인 및 토큰 발급
  const verifyEmailRes = await verifyEmail({
    email,
    code,
  });

  const { token } = verifyEmailRes.result;
  if (verifyEmailRes.code !== 1000 || !token) throw new Error(verifyEmailRes.message);

  return { emailVerifyToken: token };
}
