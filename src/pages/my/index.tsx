import { Tab } from "components/layout/Footer";
import Layout from "components/layout/Layout";
import Narrow from "components/layout/Narrow";

export default function My() {
  return (
    <Layout headerContent="내 정보" tab={Tab.My}>
      <Narrow>
        <h1>나</h1>
      </Narrow>
    </Layout>
  );
}
