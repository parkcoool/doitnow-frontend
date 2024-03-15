declare module "user" {
  /**
   * @description 사용자 정보입니다.
   */
  interface User {
    id: number;
    name: string;
    email?: string;
  }

  /**
   * @description 프로필 미리보기 정보입니다.
   */
  interface ProfilePreview {
    profileImage: string | null;
    name: string;
    bio: string | null;
  }

  /**
   * @description 프로필 정보입니다.
   */
  interface Profile {
    profileImage: string | null;
    name: string;
    bio: string | null;
    createdAt: Date;
  }
}
