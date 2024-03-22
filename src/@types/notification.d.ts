declare module "notification" {
  /**
   * @description 프로필 미리보기 정보입니다.
   */
  interface Notification {
    id: number;
    text: string;
    link: string;
    type: string;
    read: boolean;
    createdAt: string;
  }
}
