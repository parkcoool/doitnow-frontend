declare module "api" {
  /**
   * @description `kakao`, `naver` 등의 인증 제공자로, 현재는 `kakao`만 지원합니다.
   */
  type AuthProvider = "kakao";

  /**
   * @description doitnow API 서버의 응답 형식입니다.
   * @template T 응답의 `result` 필드에 포함된 데이터의 타입입니다.
   */
  interface APIResponse<T> {
    code: string;
    message: string;
    result: T;
  }
}
