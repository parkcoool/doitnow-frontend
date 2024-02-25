/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

import getUserByIdentifier from "apis/getUserByIdentifier";

import { inputStyle, formStyle } from "./style";
import { LoginData, LoginStep } from "./";

import type { Theme } from "@mui/material";

interface IdentifierProps {
  loginData: LoginData;
  loginDataDispatch: React.Dispatch<Partial<LoginData>>;
  theme: Theme;
}

export default function Identifier({ loginData, loginDataDispatch, theme }: IdentifierProps) {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const res = await getUserByIdentifier({ identifier: loginData.identifier });
      setLoading(false);

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
    <form onSubmit={handleSubmit} css={formStyle(theme)}>
      <TextField
        css={inputStyle(theme)}
        label="이메일"
        type="email"
        value={loginData.identifier}
        autoComplete="email"
        onChange={(e) => loginDataDispatch({ identifier: e.target.value })}
      />

      <div
        css={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button variant="text" color="primary">
          계정 생성
        </Button>
        <Button variant="contained" color="primary" type="submit">
          다음
        </Button>
      </div>
    </form>
  );
}
