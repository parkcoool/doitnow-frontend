/** @jsxImportSource @emotion/react */

import React from "react";
import SeachBar from "./components/SearchBar";
import FriendList from "./components/FriendList";

import type { SmallProfile } from "user";

export default function Friend() {
  const [selectedFriend, setSelectedFriend] = React.useState<SmallProfile | null>(null);

  function handleSelectFriend(event: React.MouseEvent<HTMLElement>, friend: SmallProfile | null) {
    setSelectedFriend(friend);
  }

  return (
    <>
      {/* 검색 바 */}
      <div
        css={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
        <SeachBar />
      </div>

      {/* 친구 목록 */}
      <FriendList selectedFriend={selectedFriend} onChange={handleSelectFriend} />
    </>
  );
}
