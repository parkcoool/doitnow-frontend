/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";

import { ButtonBase, Collapse, Paper, Typography } from "@mui/material";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

import Avatar from "components/common/Avatar";
import DeferredSkeleton from "components/common/DeferredSkeleton";

import FriendButton from "./FriendButton";

import type { SmallProfile } from "user";

interface FriendProps {
  profile?: SmallProfile;
  expand?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
}

export default function Friend({ profile, expand = false, onExpand, onCollapse }: FriendProps) {
  const navigate = useNavigate();

  function handleButtonClick() {
    expand ? handleCollapse() : handleExapnd();
  }

  function handleExapnd() {
    onExpand?.();
  }

  function handleCollapse() {
    onCollapse?.();
  }

  function handleDelete() {
    if (profile === undefined) return;
  }

  function handleProfile() {
    if (profile === undefined) return;
    navigate(`/profile/${profile.id}`);
  }

  return (
    <Paper elevation={expand ? 2 : 0}>
      <ButtonBase
        css={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          width: "100%",
          padding: "12px",
        }}
        onClick={handleButtonClick}
      >
        {/* 프로필 사진 */}
        <span>
          <Avatar profileImage={profile?.profileImage} name={profile?.name} username={profile?.username} />
        </span>

        {/* 이름 및 사용자 이름 */}
        <span
          css={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Typography fontWeight={600}>{profile ? profile.username : <DeferredSkeleton width={200} />}</Typography>
          <Typography fontWeight={500} fontSize="14px" color="text.secondary">
            {profile ? `@${profile.name}` : <DeferredSkeleton width={300} />}
          </Typography>
        </span>
      </ButtonBase>

      {/* 소개 및 버튼 */}
      <Collapse in={expand}>
        <div>
          <div
            css={{
              padding: "0 68px",
              display: "flex",
              flexDirection: "row",
              gap: "8px",
            }}
          >
            <Typography fontWeight={600} fontSize="14px" color="text.primary">
              소개
            </Typography>

            <Typography fontWeight={500} fontSize="14px" color="text.secondary">
              {profile ? profile.bio : <DeferredSkeleton width={300} />}
            </Typography>
          </div>

          <div
            css={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              padding: "4px",
              marginTop: "8px",
            }}
          >
            <FriendButton>
              <PersonRemoveRoundedIcon />
              <Typography fontWeight={600} fontSize="14px">
                친구 삭제
              </Typography>
            </FriendButton>

            <FriendButton onClick={handleProfile}>
              <AccountCircleRoundedIcon />
              <Typography fontWeight={600} fontSize="14px">
                프로필
              </Typography>
            </FriendButton>
          </div>
        </div>
      </Collapse>
    </Paper>
  );
}
