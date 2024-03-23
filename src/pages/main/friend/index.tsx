/** @jsxImportSource @emotion/react */

import React from "react";
import InfiniteScroll from "react-infinite-scroller";

import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";

import getFriends from "apis/getFriends";

import useSessionStore from "contexts/useSessionStore";

import FriendComponent from "./components/Friend";

import type { SmallProfile } from "user";

export default function Friend() {
  const session = useSessionStore();

  const [initialLoading, setInitialLoading] = React.useState(true);
  const [moreLoading, setMoreLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [friends, setFriends] = React.useState<SmallProfile[]>([]);
  const [expand, setExpand] = React.useState<number[]>([]);

  React.useEffect(() => {
    handleInitialLoad();
  }, [session]);

  function handleExpand(id: number) {
    setExpand([id]);
  }

  // 친구 불러오기
  async function loadFriends() {
    const accessToken = session.accessToken?.token;
    if (accessToken === undefined) return;

    const res = await getFriends({ offset: friends.length }, accessToken);
    if (res.status !== 200) return;

    setHasMore(res.data.hasMore);
    setFriends((prev) => [...prev, ...res.data.friends]);
  }

  async function handleMoreLoad() {
    if (moreLoading || !hasMore) return;
    setMoreLoading(true);
    await loadFriends();
    setMoreLoading(false);
  }

  async function handleInitialLoad() {
    setInitialLoading(true);
    await loadFriends();
    setInitialLoading(false);
  }

  return (
    <>
      <div>
        {/* 로드 중일 때 */}
        {initialLoading && (
          <>
            <FriendComponent />
            <FriendComponent />
            <FriendComponent />
            <FriendComponent />
            <FriendComponent />
          </>
        )}

        {/* 친구가 있을 때 */}
        {!initialLoading && friends.length > 0 && (
          <InfiniteScroll
            css={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
            loadMore={handleMoreLoad}
            hasMore={hasMore}
            useWindow
            loader={
              <div
                key={0}
                css={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "16px 0",
                }}
              >
                <CircularProgress />
              </div>
            }
          >
            {friends.map((friend) => (
              <FriendComponent
                key={friend.id}
                profile={friend}
                expand={expand.includes(friend.id) ?? false}
                onExpand={() => handleExpand(friend.id)}
                onCollapse={() => setExpand([])}
              />
            ))}
          </InfiniteScroll>
        )}

        {/* 친구가 없을 때 */}
        {!initialLoading && friends.length === 0 && (
          <div
            css={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "300px",
            }}
          >
            <Typography>친구가 없어요.</Typography>
          </div>
        )}
      </div>
    </>
  );
}
