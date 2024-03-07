import type { NavigateFunction } from "react-router-dom";
import getUserByIdentifier from "apis/getUserByIdentifier";
import getToken from "apis/getToken";
import { LoginData, LoginStep } from "./";

interface HandleSubmitProps {
  navigate: NavigateFunction;
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

    navigate("./", {
      state: {
        step: LoginStep.Password,
      },
    });
  } catch (error) {
    navigate("./", {
      state: {
        step: LoginStep.Identifier,
        message: error,
      },
    });
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

    navigate("/");
  } catch (error) {
    navigate("./", {
      state: {
        step: LoginStep.Password,
        message: error,
      },
    });
  } finally {
    loginDataDispatch({ password: "" });
    setLoading(false);
  }
}
