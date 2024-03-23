declare module "user" {
  import type { FriendStatus } from "constant/friendStatus";

  /**
   * @description 프로필 미리보기 정보입니다.
   */
  interface SmallProfile {
    id: number;
    profileImage: string | null;
    username: string;
    name: string;
    bio: string | null;
  }

  /**
   * @description 공개 프로필 정보입니다.
   */
  interface PublicProfile {
    id: number;
    profileImage: string | null;
    username: string;
    name: string;
    bio: string | null;
    createdAt: Date;
    friendStatus: FriendStatus | null;
  }

  /**
   * @description 개인 프로필 정보입니다.
   */
  interface FullProfile {
    id: number;
    profileImage: string | null;
    username: string;
    name: string;
    bio: string | null;
    createdAt: Date;
    email: string;
  }
}
