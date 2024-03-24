/** @jsxImportSource @emotion/react */

import React from "react";
import Narrow from "components/layout/Narrow";
import DeferredView from "components/common/DeferredView";
import SeachBar from "./components/SearchBar";
import FriendList from "./components/FriendList";

import Feed from "./components/Feed";
import type { SmallProfile } from "user";

export default function Friend() {
  const [selectedFriend, setSelectedFriend] = React.useState<SmallProfile | null>(null);

  function handleSelectFriend(event: React.MouseEvent<HTMLElement>, friend: SmallProfile | null) {
    setSelectedFriend(friend);
  }

  return (
    <DeferredView loaded={true}>
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

      {/* 피드 */}
      {selectedFriend !== null && (
        <Narrow>
          <div
            css={{
              marginTop: "8px",
            }}
          >
            <Feed selectedFriend={selectedFriend} />
          </div>
        </Narrow>
      )}
    </DeferredView>
  );
}
