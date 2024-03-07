/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Link, Chip } from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import CircularProgress from "@mui/material/CircularProgress";

import getToken from "apis/getToken";
import Narrow from "components/layout/Narrow";
import { LoginData, LoginStep } from "./";

interface PasswordProps {
  loginData: LoginData;
  loginDataDispatch: React.Dispatch<Partial<LoginData>>;
}

export default function Password({ loginData, loginDataDispatch }: PasswordProps) {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const res = await getToken({
        authProvider: loginData.authProvider,
        identifier: loginData.identifier,
        password: loginData.password,
      });

      if (res.code !== 1000) {
        loginDataDispatch({ password: "" });
        navigate("./", { state: { step: LoginStep.Identifier, message: res.message } });
      } else {
        navigate("/");
      }
    } catch (e) {
      loginDataDispatch({ password: "" });
      navigate("./", { state: { step: LoginStep.Password, message: e } });
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
          비밀번호를 입력해주세요.
        </h2>

        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "16px 0 0 0",
          }}
        >
          <Chip
            avatar={<AccountCircleRoundedIcon />}
            label={loginData.identifier}
            variant="outlined"
            onClick={() => navigate(-1)}
            css={{
              margin: "32px 0 0 0",
              fontWeight: 600,
            }}
          />
        </div>

        {/* 폼 */}
        <form
          onSubmit={handleSubmit}
          css={{
            margin: "16px 0 0 0",
          }}
        >
          <TextField
            disabled={loading}
            label="비밀번호"
            type="password"
            autoComplete="password"
            onChange={(e) => loginDataDispatch({ password: e.target.value })}
            css={{
              width: "100%",
              margin: "0",
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
          <Button startIcon={<HelpOutlineRoundedIcon />}>비밀번호를 잊어버렸어요.</Button>
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
        <Button
          variant="contained"
          disabled={loading || loginData.password === ""}
          endIcon={loading ? <CircularProgress size="20px" color="inherit" /> : <NavigateNextRoundedIcon />}
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
