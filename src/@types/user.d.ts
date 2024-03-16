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
  interface SmallProfile {
    profileImage: string | null;
    name: string;
    bio: string | null;
  }

  /**
   * @description 공개 프로필 정보입니다.
   */
  interface PublicProfile {
    profileImage: string | null;
    name: string;
    bio: string | null;
    createdAt: Date;
  }

  /**
   * @description 개인 프로필 정보입니다.
   */
  interface FullProfile {
    profileImage: string | null;
    name: string;
    bio: string | null;
    createdAt: Date;
    email: string;
  }
}
