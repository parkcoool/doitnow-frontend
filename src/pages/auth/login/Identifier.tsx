/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate } from "react-router-dom";

import { css } from "@emotion/react";
import { TextField, Button } from "@mui/material";

import { LoginData, LoginStep } from "./";

interface IdentifierProps {
  loginData: LoginData;
  loginDataDispatch: React.Dispatch<Partial<LoginData>>;
}

export default function Identifier({ loginData, loginDataDispatch }: IdentifierProps) {
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate("./", { state: { step: LoginStep.Password } });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="이메일"
          type="email"
          value={loginData.identifier}
          autoComplete="email"
          onChange={(e) => loginDataDispatch({ identifier: e.target.value })}
        />

        <Button variant="contained" color="primary" type="submit">
          다음
        </Button>
      </form>
    </div>
  );
}
