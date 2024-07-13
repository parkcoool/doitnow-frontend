import useSessionStore from "contexts/useSessionStore";

import Narrow from "components/layout/Narrow";

import Today from "./components/Today";

export default function Home() {
  const session = useSessionStore();

  return (
    <>
      <Narrow>h</Narrow>
    </>
  );
}
