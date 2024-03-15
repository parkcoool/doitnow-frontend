import useSessionStore from "contexts/useSessionStore";
import Layout from "components/layout/Layout";
import { Tab } from "components/layout/Footer";

export default function Home() {
  const session = useSessionStore();

  return (
    <Layout tab={Tab.Home} headerDisabled>
      {session.user?.name}
    </Layout>
  );
}
