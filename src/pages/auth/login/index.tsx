/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { CircularProgress } from "@mui/material";
import {
  NavigateNextRounded as NavigateNextRoundedIcon,
  PersonAddAltRounded as PersonAddAltRoundedIcon,
} from "@mui/icons-material";

import Layout from "components/layout/Layout";
import Narrow from "components/layout/Narrow";
import BottomButton from "components/common/BottomButton";
import getReducer from "utils/common/getReducer";

import useSessionStore from "contexts/useSessionStore";
import Identifier from "./components/Identifier";
import Password from "./components/Password";

import handleIdentifierSubmit from "./utils/handleIdentifierSubmit";
import handlePasswordSubmit from "./utils/handlePasswordSubmit";
import storeToken from "./utils/storeToken";

import type { AuthProvider, Token } from "auth";

interface LoginLocationState {
  step: LoginStep;
}

export interface SubmitData {
  identifier: string;
  password: string;
  authProvider: AuthProvider | null;
}

export interface ReceivedData {
  id?: number;
  token?: { accessToken: Token; refreshToken: Token };
  name?: string;
  errorMessage?: string;
}

export enum LoginStep {
  Identifier = 0,
  Password = 1,
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const session = useSessionStore();

  // location.state을 가져온다.
  const step = (location.state as LoginLocationState)?.step ?? LoginStep.Identifier;

  // submitData를 관리하는 reducer를 생성한다.
  const submitDataReducer = getReducer<SubmitData>();
  const [submitData, submitDataDispatch] = React.useReducer(submitDataReducer, {
    identifier: "",
    password: "",
    authProvider: null,
  });

  // receivedData를 관리하는 reducer를 생성한다.
  const receivedDataReducer = getReducer<ReceivedData>();
  const [receivedData, receivedDataDispatch] = React.useReducer(receivedDataReducer, {});

  // 로딩 여부 상태를 관리한다.
  const [loading, setLoading] = React.useState(false);

  // 값 수정이 감지되면 에러 메시지를 초기화한다.
  React.useEffect(() => {
    receivedDataDispatch({ errorMessage: undefined });
  }, [submitData]);

  // 다음 단계로 이동하는 함수
  async function handleNextStep(currentStep: LoginStep) {
    let newErrorMessage: string | undefined = undefined;
    let nextStep: LoginStep | undefined = undefined;
    setLoading(true);

    try {
      switch (currentStep) {
        case LoginStep.Identifier: {
          const partialReceivedData = await handleIdentifierSubmit(submitData.identifier);
          receivedDataDispatch(partialReceivedData);
          nextStep = LoginStep.Password;
          break;
        }
        case LoginStep.Password: {
          const partialReceivedData = await handlePasswordSubmit(submitData);
          receivedDataDispatch(partialReceivedData);

          // 사용자 정보를 업데이트하고 토큰을 저장한다.
          session.setUser({
            id: receivedData.id ?? session.user?.id ?? 0,
            name: receivedData.name ?? session.user?.name ?? "",
          });
          storeToken(session, partialReceivedData.token?.accessToken, partialReceivedData.token?.refreshToken);

          backToSource();
          break;
        }
        default: {
          backToSource();
          break;
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        newErrorMessage = error.message;
      }
    } finally {
      receivedDataDispatch({ errorMessage: newErrorMessage });
      if (nextStep) navigate("./", { state: { step: nextStep } });
      setLoading(false);
    }
  }

  // 원래 페이지로 돌아가는 함수
  function backToSource() {
    navigate(-1 * (step + 1));
  }

  // 다음 버튼 비활성화 여부를 반환하는 함수
  function nextStepButtonDisabled() {
    return (
      loading ||
      (step === LoginStep.Identifier && submitData.identifier === "") ||
      (step === LoginStep.Password && submitData.password === "")
    );
  }

  return (
    <Layout headerContent="로그인" loading={loading} footerDisabled>
      {/* step에 따른 컴포넌트 렌더링 */}
      <Narrow>
        {step === LoginStep.Identifier && (
          <Identifier
            submitData={submitData}
            submitDataDispatch={submitDataDispatch}
            receivedData={receivedData}
            loading={loading}
            onSubmit={() => handleNextStep(LoginStep.Identifier)}
          />
        )}

        {step === LoginStep.Password && (
          <Password
            submitData={submitData}
            submitDataDispatch={submitDataDispatch}
            receivedData={receivedData}
            loading={loading}
            onSubmit={() => handleNextStep(LoginStep.Password)}
          />
        )}
      </Narrow>

      {/* 하단 버튼 */}
      <div
        css={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <BottomButton
          primaryText="다음"
          secondaryText="계정 생성하기"
          primaryButtonProps={{
            variant: "contained",
            onClick: () => handleNextStep(step),
            disabled: nextStepButtonDisabled(),
            endIcon: loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <NavigateNextRoundedIcon color="inherit" />
            ),
            disableElevation: true,
          }}
          secondaryButtonProps={{
            startIcon: <PersonAddAltRoundedIcon />,
            onClick: () =>
              navigate("/auth/signup", {
                state: {
                  sourceLocation: {
                    pathname: location.pathname,
                  },
                },
              }),
          }}
        />
      </div>
    </Layout>
  );
}
