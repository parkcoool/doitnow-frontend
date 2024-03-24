/** @jsxImportSource @emotion/react */

import React from "react";

import { ToggleButtonGroup, toggleButtonGroupClasses } from "@mui/material";
import getFriends from "apis/getFriends";
import useSessionStore from "contexts/useSessionStore";

import FriendComponent from "./components/FriendToggleButton";

import type { SmallProfile } from "user";

export default function Friend() {
  const session = useSessionStore();

  const [initialLoading, setInitialLoading] = React.useState(true);
  const [moreLoading, setMoreLoading] = React.useState(false);

  const [hasMore, setHasMore] = React.useState(true);
  const [friends, setFriends] = React.useState<SmallProfile[]>([]);

  const [selectedFriend, setSelectedFriend] = React.useState<SmallProfile | null>(null);

  React.useEffect(() => {
    handleInitialLoad();
  }, [session]);

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

  function handleSelectFriend(event: React.MouseEvent<HTMLElement>, id: number | null) {
    if (id === null) {
      setSelectedFriend(null);
      return;
    }

    const friend = friends.find((friend) => friend.id === id);
    if (friend === undefined) return;

    setSelectedFriend(friend);
  }

  return (
    <>
      <ToggleButtonGroup
        value={selectedFriend?.id}
        onChange={handleSelectFriend}
        exclusive
        css={{
          display: "flex",
          flexDirection: "row",
          padding: "8px",
          overflowX: "auto",
          gap: "4px",
          [`& .${toggleButtonGroupClasses.grouped}`]: {
            border: 0,
            borderRadius: "4px",
            [`&.${toggleButtonGroupClasses.disabled}`]: {
              border: 0,
            },
          },
        }}
      >
        {/* 로드 중일 때 */}
        {initialLoading && (
          <>
            <FriendComponent value={0} />
            <FriendComponent value={0} />
            <FriendComponent value={0} />
          </>
        )}

        {/* TODO: infinite scroll */}
        {/* 친구가 있을 때 */}
        {!initialLoading &&
          friends.length > 0 &&
          friends.map((friend) => <FriendComponent value={friend.id} key={friend.id} profile={friend} />)}
      </ToggleButtonGroup>
    </>
  );
}
