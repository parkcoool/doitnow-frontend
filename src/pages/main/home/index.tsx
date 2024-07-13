/** @jsxImportSource @emotion/react */
import React from "react";

import getTaskCount from "apis/getTaskCount";

import useSessionStore from "contexts/useSessionStore";

import Narrow from "components/layout/Narrow";

import Today from "./components/Today";

import type { TodayProps } from "./components/Today";

export default function Home() {
  const session = useSessionStore();

  const [todayData, setTodayData] = React.useState<TodayProps>({});

  React.useEffect(() => {
    // today
    {
      if (session.user !== null)
        setTodayData((prev) => ({ ...prev, username: session.user?.username }));

      if (session.accessToken !== null) {
        const accessToken = session.accessToken;
        getTaskCount({ done: true }, accessToken.token).then((res) =>
          setTodayData((prev) => ({ ...prev, doneTaskCount: res.data.count }))
        );
        getTaskCount({ done: false }, accessToken.token).then((res) =>
          setTodayData((prev) => ({ ...prev, totalTaskCount: res.data.count }))
        );
      }
    }
  }, [session]);

  return (
    <>
      <Narrow>
        <div
          css={{
            paddingTop: "20px",
          }}
        >
          <Today {...todayData} />
        </div>
      </Narrow>
    </>
  );
}
