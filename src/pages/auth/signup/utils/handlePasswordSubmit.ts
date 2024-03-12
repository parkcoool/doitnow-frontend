import type { SignupData } from "../";

export default function handlePasswordSubmit(password: string, passwordConfirm: string): Partial<SignupData> {
  // 비밀번호 유효성 검사
  if (password !== passwordConfirm) throw new Error("비밀번호가 일치하지 않아요.");
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,20}$/.test(password))
    throw new Error("영어, 숫자를 조합하여 8자 이상, 20자 이하여야 해요.");

  return {};
}
