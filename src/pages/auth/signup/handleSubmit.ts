import verifyEmail, { SendEmailResponse } from "apis/sendEmail";
import type { APIResponse } from "api";

interface HandleSubmitProps {
  onSuccess: (res: APIResponse<SendEmailResponse>) => void;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

type HandleEmailSubmitProps = HandleSubmitProps & {
  email: string;
};

export async function handleEmailSubmit({
  email,
  onSuccess,
  setErrorMessage,
  loading,
  setLoading,
}: HandleEmailSubmitProps) {
  if (loading) return;
  setLoading(true);

  try {
    const res = await verifyEmail({ email });

    if (res.code !== 1000) throw new Error(res.message);

    setErrorMessage(undefined);
    onSuccess(res);
  } catch (error) {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    }
  } finally {
    setLoading(false);
  }
}
