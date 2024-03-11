import getUserByIdentifier from "apis/getUserByIdentifier";
import getToken from "apis/getToken";

interface HandleSubmitProps {
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

type HandleIdentifierSubmitProps = HandleSubmitProps & {
  identifier: string;
};

export async function handleIdentifierSubmit({
  identifier,
  setErrorMessage,
  loading,
  setLoading,
}: HandleIdentifierSubmitProps) {
  if (loading) return;
  setLoading(true);

  try {
    const res = await getUserByIdentifier({
      identifier,
    });

    if (res.code !== 1000) throw new Error(res.message);

    setErrorMessage(undefined);
    return res.result;
  } catch (error) {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    }
  } finally {
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
  setErrorMessage,
  loading,
  setLoading,
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
    return res.result;
  } catch (error) {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    }
  } finally {
    setLoading(false);
  }

  return;
}
