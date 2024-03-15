import useSessionStore from "contexts/useSessionStore";
import Layout from "components/layout/Layout";

export default function Home() {
  const session = useSessionStore();

  return <Layout headerDisabled>{session.user?.name}</Layout>;
}
