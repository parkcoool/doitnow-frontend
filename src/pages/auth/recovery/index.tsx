/** @jsxImportSource @emotion/react */

import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { AlternateEmailRounded as AlternateEmailRoundedIcon, KeyRounded as KeyRoundedIcon } from "@mui/icons-material";

import Layout from "components/layout/Layout";
import Narrow from "components/layout/Narrow";

import type { ButtonProps } from "@mui/material";
import type { LocationState } from "location";

const RecoveryButton = styled(Button)<ButtonProps>(({ theme }) => ({
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  padding: "16px",
  fontSize: "16px",
  fontWeight: 500,
  justifyContent: "flex-start",
  color: theme.palette.text.primary,
}));

type RecoveryLocationState = LocationState;

export default function Recovery() {
  const navigate = useNavigate();
  const location = useLocation();

  const { sourceLocation } = (location.state ?? {}) as RecoveryLocationState;

  return (
    <Layout
      headerContent="계정 복구"
      onBack={sourceLocation ? () => navigate(sourceLocation.pathname, { state: sourceLocation.state }) : undefined}
      footerDisabled
    >
      <Narrow>
        <h1
          css={{
            fontFamily: `"Pretendard", sans-serif`,
            fontSize: "24px",
            fontWeight: 700,
            margin: "16px 0 0 0",
          }}
        >
          로그인에 문제가 있나요?
        </h1>

        <div
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "32px",
          }}
        >
          <RecoveryButton
            startIcon={<AlternateEmailRoundedIcon />}
            onClick={() => navigate("./email", { state: { sourceLocation } })}
          >
            이메일 주소를 잊어버렸어요.
          </RecoveryButton>
          <RecoveryButton
            startIcon={<KeyRoundedIcon />}
            onClick={() => navigate("./password", { state: { sourceLocation } })}
          >
            비밀번호를 잊어버렸어요.
          </RecoveryButton>
        </div>
      </Narrow>
    </Layout>
  );
}
