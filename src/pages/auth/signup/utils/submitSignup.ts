import createUser from "apis/createUser";

interface SubmitSignupProps {
  email: string;
  name: string;
  password: string;
  emailToken: string;
}

export default async function submitSignup({ email, name, password, emailToken }: SubmitSignupProps) {
  return await createUser({
    email,
    name,
    password,
    emailToken,
  });
}
