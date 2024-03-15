import { Tab } from "components/layout/Footer";
import Layout from "components/layout/Layout";
import Narrow from "components/layout/Narrow";

export default function Friend() {
  return (
    <Layout headerContent="친구" tab={Tab.Friend}>
      <Narrow>
        <h1>친구</h1>
      </Narrow>
    </Layout>
  );
}
