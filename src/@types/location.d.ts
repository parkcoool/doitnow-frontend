declare module "location" {
  /**
   * @description location 객체에 대한 상태입니다.
   */
  interface LocationState {
    sourceLocation?: SourceLocation;
  }

  /**
   * @description 페이지 이동 시 전달되는 원본 페이지에 대한 상태입니다.
   */
  interface SourceLocation {
    pathname: string;
    state: object;
  }
}
