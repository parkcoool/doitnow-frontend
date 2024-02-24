declare module "api" {
  /**
   * @description `kakao`, `naver` 등의 인증 제공자입니다. `null`은 로컬 인증을 의미합니다.
   */
  type AuthProvider = null | "kakao";

  /**
   * @description doitnow API 서버의 응답 형식입니다.
   * @template T 응답의 `result` 필드에 포함된 데이터의 타입입니다.
   */
  interface APIResponse<T> {
    code: number;
    message: string;
    result: T;
  }
}
