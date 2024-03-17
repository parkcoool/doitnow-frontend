import getPublicProfile from "apis/getPublicProfile";

export default async function handleNameSubmit(name: string) {
  // 이름 유효성 검사
  if (/^[a-zA-Z0-9_]{3,20}$/.test(name) === false)
    throw new Error("영어, 숫자, 밑줄(_)만 쓸 수 있고, 3자 이상 20자 이하여야 해요.");

  const getPublicProfileRes = await getPublicProfile({ name });

  if (getPublicProfileRes.status === 200) throw new Error("이름이 이미 사용되고 있어요.");
  else if (getPublicProfileRes.status !== 404) throw new Error(getPublicProfileRes.data.message);

  return {};
}
