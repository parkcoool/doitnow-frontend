/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import CircularProgress from "@mui/material/CircularProgress";

import getUserByIdentifier from "apis/getUserByIdentifier";
import Narrow from "components/layout/Narrow";
import { LoginData, LoginStep } from "./";

interface IdentifierProps {
  loginData: LoginData;
  loginDataDispatch: React.Dispatch<Partial<LoginData>>;
}

export default function Identifier({ loginData, loginDataDispatch }: IdentifierProps) {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      loginDataDispatch({ identifier: loginData.identifier.trim() });
      const res = await getUserByIdentifier({ identifier: loginData.identifier });

      if (res.code !== 1000) {
        loginDataDispatch({ password: "" });
        navigate("./", { state: { step: LoginStep.Identifier, message: res.message } });
      } else {
        loginDataDispatch({ name: res.result.user?.name ?? "" });
        navigate("./", { state: { step: LoginStep.Password } });
      }
    } catch (e) {
      loginDataDispatch({ password: "" });
      navigate("./", { state: { step: LoginStep.Identifier, message: e } });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Narrow>
        {/* 설명 */}
        <h1
          css={{
            fontFamily: `"Pretendard", sans-serif`,
            fontSize: "24px",
            fontWeight: 700,
            margin: "16px 0 0 0",
          }}
        >
          DoItNow 시작하기
        </h1>
        <h2
          css={{
            fontFamily: `"Pretendard", sans-serif`,
            fontSize: "16px",
            fontWeight: 500,
            margin: "4px 0 0 0",
          }}
        >
          이메일 또는 아이디를 입력해주세요.
        </h2>

        {/* 폼 */}
        <form
          onSubmit={handleSubmit}
          css={{
            margin: "32px 0 0 0",
          }}
        >
          <TextField
            disabled={loading}
            label="이메일 또는 아이디"
            type="email username"
            value={loginData.identifier}
            autoComplete="email username"
            onChange={(e) => loginDataDispatch({ identifier: e.target.value })}
            css={{
              width: "100%",
              margin: "16px 0 0 0",
            }}
          />
        </form>

        {/* 버튼 */}
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            margin: "16px 0 0 0",
          }}
        >
          <Button startIcon={<HelpOutlineRoundedIcon />}>이메일을 잊어버렸어요.</Button>
        </div>
      </Narrow>

      {/* 버튼 */}
      <div
        css={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          position: "absolute",
          bottom: 0,
          padding: "16px",
        }}
      >
        <Button startIcon={<PersonAddAlt1Icon />} size="small">
          새 계정 만들기
        </Button>

        <Button
          variant="contained"
          disabled={loading || loginData.identifier === ""}
          endIcon={loading ? <CircularProgress size={16} color="inherit" /> : <NavigateNextRoundedIcon />}
          onClick={() => handleSubmit()}
          disableElevation
          css={{
            width: "100%",
            height: "48px",
            borderRadius: "18px",
          }}
        >
          다음
        </Button>
      </div>
    </>
  );
}
