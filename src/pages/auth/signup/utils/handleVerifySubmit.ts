import verifyEmail from "apis/verifyEmail";

import submitSignup from "./submitSignup";
import type { SignupData } from "../";

export default async function handleVerifySubmit(
  email: string,
  code: string,
  signupData: SignupData
): Promise<Partial<SignupData>> {
  // 이메일 인증 코드 확인 및 토큰 발급
  const verifyEmailRes = await verifyEmail({
    email,
    code,
  });

  const { token } = verifyEmailRes.result;
  if (verifyEmailRes.code !== 1000 || !token) throw new Error(verifyEmailRes.message);

  // 계정 생성 요청
  const submitRes = await submitSignup({
    email: signupData.email,
    name: signupData.name,
    password: signupData.password,
    emailToken: token,
  });
  if (submitRes.code !== 1000) throw new Error(submitRes.message);

  return {};
}
