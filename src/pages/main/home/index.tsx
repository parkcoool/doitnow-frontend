import useSessionStore from "contexts/useSessionStore";

export default function Home() {
  const session = useSessionStore();

  return <>{session.user?.name}</>;
}
