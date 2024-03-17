export default async function handleUsernameSubmit(username: string) {
  if (/^[가-힣a-zA-Z]{2,20}$/.test(username) === false)
    throw new Error("한글과 영어만 사용할 수 있고, 2자 이상 20자 이하여야 해요.");
  return {};
}
