import { useNavigate } from "react-router-dom";
import ProfilePreview from "components/common/ProfilePreview";

import type { SmallProfile } from "user";

interface FeedProps {
  selectedFriend: SmallProfile;
}

export default function Feed({ selectedFriend }: FeedProps) {
  const navigate = useNavigate();

  return (
    <>
      <ProfilePreview profilePreview={selectedFriend} onClick={() => navigate(`/profile/${selectedFriend.id}`)} />
    </>
  );
}
