import createUser from "apis/createUser";
import sendEmail from "apis/sendEmail";
import getUserByIdentifier from "apis/getUserByIdentifier";
import verifyEmail from "apis/verifyEmail";

interface HandleSubmitProps {
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

type HandleEmailSubmitProps = HandleSubmitProps & {
  email: string;
};

export async function handleEmailSubmit({ email, setErrorMessage, loading, setLoading }: HandleEmailSubmitProps) {
  if (loading) return;
  setLoading(true);

  try {
    // 이메일 중복 확인
    const getUserByIndentifierRes = await getUserByIdentifier({
      identifier: email,
    });

    if (getUserByIndentifierRes.code === 1000) throw new Error("이메일이 이미 사용되고 있습니다.");
    else if (getUserByIndentifierRes.code !== 1001) throw new Error(getUserByIndentifierRes.message);

    // 이메일 인증 메일 발송
    const sendEmailRes = await sendEmail({ email });

    if (sendEmailRes.code !== 1000) throw new Error(sendEmailRes.message);

    setErrorMessage(undefined);
    return sendEmailRes.result;
  } catch (error) {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    }
  } finally {
    setLoading(false);
  }
}

type HandleNameSubmitProps = HandleSubmitProps & {
  name: string;
};

export async function handleNameSubmit({ name, setErrorMessage, loading, setLoading }: HandleNameSubmitProps) {
  if (loading) return false;

  if (/\W/.test(name) === true) {
    setErrorMessage("영어, 숫자, 밑줄(_)만 쓸 수 있어요.");
    return false;
  }

  if (name.length < 3 || name.length > 20) {
    setErrorMessage("3자 이상 20자 이하여야 해요.");
    return false;
  }

  setLoading(true);

  try {
    // 아이디 중복 확인
    const getUserByIndentifierRes = await getUserByIdentifier({
      identifier: name,
    });

    if (getUserByIndentifierRes.code === 1000) throw new Error("아이디가 이미 사용되고 있습니다.");
    else if (getUserByIndentifierRes.code !== 1001) throw new Error(getUserByIndentifierRes.message);

    setErrorMessage(undefined);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    }
  } finally {
    setLoading(false);
  }

  return false;
}

type handleVerifySubmitProps = HandleSubmitProps & {
  email: string;
  code: string;
};

export async function handleVerifySubmit({
  email,
  code,
  setErrorMessage,
  loading,
  setLoading,
}: handleVerifySubmitProps) {
  if (loading) return;
  setLoading(true);

  try {
    // 이메일 인증 코드 확인 및 토큰 발급
    const verifyEmailRes = await verifyEmail({
      email,
      code,
    });

    if (verifyEmailRes.code !== 1000) throw new Error(verifyEmailRes.message);

    return verifyEmailRes.result;
  } catch (error) {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    }
  } finally {
    setLoading(false);
  }
}

type handleFinalSubmitProps = HandleSubmitProps & {
  email: string;
  name: string;
  password: string;
  emailToken: string;
};

export async function handleFinalSubmit({
  email,
  name,
  password,
  emailToken,
  setErrorMessage,
  loading,
  setLoading,
}: handleFinalSubmitProps) {
  if (loading) return false;
  setLoading(true);

  try {
    // 회원가입
    const signupRes = await createUser({
      email,
      name,
      password,
      emailToken,
    });

    if (signupRes.code !== 1000) throw new Error(signupRes.message);

    return true;
  } catch (error) {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    }
  } finally {
    setLoading(false);
  }

  return false;
}
