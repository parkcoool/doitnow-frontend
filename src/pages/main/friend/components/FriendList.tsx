/** @jsxImportSource @emotion/react */
import React from "react";

import { ToggleButtonGroup, toggleButtonGroupClasses } from "@mui/material";

import getFriends from "apis/getFriends";
import useSessionStore from "contexts/useSessionStore";

import FriendToggleButton from "./FriendToggleButton";

import type { SmallProfile } from "user";

interface FriendToggleButtonProps {
  selectedFriend: SmallProfile | null;
  onChange: (event: React.MouseEvent<HTMLElement>, friend: SmallProfile | null) => void;
}

export default function FriendList({ selectedFriend, onChange }: FriendToggleButtonProps) {
  const session = useSessionStore();

  const [initialLoading, setInitialLoading] = React.useState(true);
  const [moreLoading, setMoreLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [friends, setFriends] = React.useState<SmallProfile[]>([]);

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

  function handleChange(event: React.MouseEvent<HTMLElement, MouseEvent>, id: number | null) {
    if (id === null) return onChange(event, null);
    
    const friend = friends.find((friend) => friend.id === id);
    if (friend === undefined) onChange(event, null);
    else onChange(event, friend);
  }

  return (
    <div>
      <ToggleButtonGroup
        value={selectedFriend?.id ?? null}
        onChange={handleChange}
        exclusive
        css={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          gap: "4px",
          padding: "0 8px",
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
            <FriendToggleButton value={0} />
            <FriendToggleButton value={0} />
            <FriendToggleButton value={0} />
          </>
        )}

        {/* TODO: infinite scroll */}
        {/* 친구가 있을 때 */}
        {!initialLoading &&
          friends.length > 0 &&
          friends.map((friend) => <FriendToggleButton value={friend.id} key={friend.id} profile={friend} />)}
      </ToggleButtonGroup>
    </div>
  );
}
