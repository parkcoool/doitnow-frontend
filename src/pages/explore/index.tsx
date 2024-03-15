import { Tab } from "components/layout/Footer";
import Layout from "components/layout/Layout";
import Narrow from "components/layout/Narrow";

export default function Friend() {
  return (
    <Layout headerContent="탐색" tab={Tab.Explore}>
      <Narrow>
        <h1>탐색</h1>
      </Narrow>
    </Layout>
  );
}
