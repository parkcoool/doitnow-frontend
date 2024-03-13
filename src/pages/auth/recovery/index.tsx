/** @jsxImportSource @emotion/react */

import { useNavigate, useLocation } from "react-router-dom";
import { AlternateEmailRounded as AlternateEmailRoundedIcon, KeyRounded as KeyRoundedIcon } from "@mui/icons-material";

import Layout from "components/layout/Layout";
import Narrow from "components/layout/Narrow";

import RecoveryButton from "./components/RecoveryButton";

import type { LocationState } from "location";

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
