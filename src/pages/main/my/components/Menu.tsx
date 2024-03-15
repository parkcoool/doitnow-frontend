/** @jsxImportSource @emotion/react */

import { Button, Typography } from "@mui/material";
import {
  LockRounded as LockRoundedIcon,
  PersonRemoveRounded as PersonRemoveRoundedIcon,
  EditRounded as EditRoundedIcon,
} from "@mui/icons-material";
import styled from "@emotion/styled";

import type { ButtonProps } from "@mui/material";

const MenuButton = styled(Button)<ButtonProps>({
  fontSize: "16px",
  padding: "8px",
  width: "100%",
  justifyContent: "flex-start",
});

const ButtonIconStyle = {
  color: "#818181",
};

interface MenuProps {
  onLogout: () => void;
}

export default function Menu({ onLogout }: MenuProps) {
  return (
    <div>
      <Typography
        css={{
          fontWeight: 700,
          fontSize: "18px",
          margin: "16px 0 8px 0",
        }}
      >
        계정
      </Typography>

      <div
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          width: "100%",
        }}
      >
        <MenuButton startIcon={<EditRoundedIcon css={ButtonIconStyle} />} color="inherit">
          계정 정보 수정
        </MenuButton>
        <MenuButton startIcon={<LockRoundedIcon css={ButtonIconStyle} />} color="inherit" onClick={onLogout}>
          로그아웃
        </MenuButton>
        <MenuButton startIcon={<PersonRemoveRoundedIcon css={ButtonIconStyle} />} color="inherit">
          계정 삭제
        </MenuButton>
      </div>
    </div>
  );
}
