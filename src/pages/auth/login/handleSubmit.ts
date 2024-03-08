import type { NavigateFunction } from "react-router-dom";
import getUserByIdentifier from "apis/getUserByIdentifier";
import getToken from "apis/getToken";
import { LoginData, LoginStep } from "./";

interface HandleSubmitProps {
  navigate: NavigateFunction;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loginDataDispatch: React.Dispatch<Partial<LoginData>>;
}

type HandleIdentifierSubmitProps = HandleSubmitProps & {
  identifier: string;
};

export async function handleIdentifierSubmit({
  identifier,
  navigate,
  setErrorMessage,
  loading,
  setLoading,
  loginDataDispatch,
}: HandleIdentifierSubmitProps) {
  if (loading) return;
  setLoading(true);

  try {
    const res = await getUserByIdentifier({
      identifier,
    });

    if (res.code !== 1000) throw new Error(res.message);

    setErrorMessage(undefined);
    navigate("./", {
      state: {
        step: LoginStep.Password,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    }
  } finally {
    loginDataDispatch({ password: "" });
    setLoading(false);
  }
}

type HandlePasswordSubmitProps = HandleSubmitProps & {
  identifier: string;
  password: string;
};

export async function handlePasswordSubmit({
  identifier,
  password,
  navigate,
  setErrorMessage,
  loading,
  setLoading,
  loginDataDispatch,
}: HandlePasswordSubmitProps) {
  if (loading) return;
  setLoading(true);

  try {
    const res = await getToken({
      authProvider: null,
      identifier,
      password,
    });

    if (res.code !== 1000) throw new Error(res.message);

    setErrorMessage(undefined);
    navigate("/");
  } catch (error) {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    }
  } finally {
    setLoading(false);
  }
}
