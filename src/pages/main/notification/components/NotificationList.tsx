/** @jsxImportSource @emotion/react */

import React from "react";
import InfiniteScroll from "react-infinite-scroller";

import { CircularProgress, Typography } from "@mui/material";

import getNotifications from "apis/getNotifications";
import useSessionStore from "contexts/useSessionStore";

import NotificationComponent from "./Notification";

import type { Notification } from "notification";

interface NotificationListProps {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  checkedNotifications: number[];
  setCheckedNotifications: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function NotificationList({
  notifications,
  setNotifications,
  checkedNotifications,
  setCheckedNotifications,
}: NotificationListProps) {
  const session = useSessionStore();

  const [initialLoading, setInitialLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(() => {
    handleInitialLoad();
  }, [session]);

  // 알림 불러오기
  async function loadNotifications() {
    const accessToken = session.accessToken?.token;
    if (accessToken === undefined) return;

    const res = await getNotifications({ offsetDate: notifications?.at(-1)?.createdAt }, accessToken);
    if (res.status !== 200) return;

    setHasMore(res.data.hasMore);
    setNotifications((prev) => [...prev, ...res.data.notifications]);
  }

  async function handleLoadMore() {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    await loadNotifications();
    setLoadingMore(false);
  }

  async function handleInitialLoad() {
    setInitialLoading(true);
    await loadNotifications();
    setInitialLoading(false);
  }

  function handleCheckChange(id: number, checked: boolean) {
    if (checked) setCheckedNotifications((prev) => [...prev, id]);
    else setCheckedNotifications((prev) => prev.filter((notificationId) => notificationId !== id));
  }

  return (
    <div>
      {/* 로드 중일 때 */}
      {initialLoading && (
        <>
          <NotificationComponent />
          <NotificationComponent />
          <NotificationComponent />
          <NotificationComponent />
          <NotificationComponent />
        </>
      )}

      {/* 알림이 있을 때 */}
      {!initialLoading && notifications.length > 0 && (
        <InfiniteScroll
          loadMore={loadNotifications}
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
          {notifications.map((notification) => (
            <NotificationComponent
              key={notification.id}
              notification={notification}
              setNotifications={setNotifications}
              checked={checkedNotifications.includes(notification.id)}
              onChange={(e, checked) => handleCheckChange(notification.id, checked)}
            />
          ))}
        </InfiniteScroll>
      )}

      {/* 알림이 없을 때 */}
      {!initialLoading && notifications.length === 0 && (
        <div
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "300px",
          }}
        >
          <Typography>알림이 없어요.</Typography>
        </div>
      )}
    </div>
  );
}
