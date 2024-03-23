/** @jsxImportSource @emotion/react */

import React from "react";
import InfiniteScroll from "react-infinite-scroller";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ClearAllRoundedIcon from "@mui/icons-material/ClearAllRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";

import { CircularProgress } from "@mui/material";
import getNotifications from "apis/getNotifications";
import readNotification from "apis/readNotification";
import deleteNotification from "apis/deleteNotification";

import useSessionStore from "contexts/useSessionStore";
import useNotificationStore from "contexts/useNotificationStore";

import NotificationComponent from "./components/Notification";

import type { Notification } from "notification";

export default function Notification() {
  const setNotificationCount = useNotificationStore((state) => state.setCount);
  const session = useSessionStore();

  const [initialLoading, setInitialLoading] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

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

  // 모두 삭제
  async function handleDeleteAll() {
    if (loading) return;

    const { accessToken } = session;
    if (accessToken === null) return;

    setLoading(true);
    const res = await deleteNotification({}, accessToken.token);

    setLoading(false);
    if (res.status !== 200) return;

    // 상태 삭제 처리
    setNotifications([]);
    setNotificationCount(0);
  }

  // 모두 읽기 처리
  async function handleReadAll() {
    if (loading) return;

    const { accessToken } = session;
    if (accessToken === null) return;

    setLoading(true);
    const res = await readNotification({}, accessToken.token);

    setLoading(false);
    if (res.status !== 200) return;

    // 상태 읽음 처리
    setNotifications((prev) => prev?.map((notification) => ({ ...notification, read: true })));
    setNotificationCount(0);
  }

  return (
    <>
      <div
        css={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "8px",
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 1,
          gap: "8px",
        }}
      >
        <Button variant="outlined" onClick={handleDeleteAll} startIcon={<DeleteSweepRoundedIcon />} disabled={loading}>
          모두 삭제
        </Button>

        <Button variant="outlined" onClick={handleReadAll} startIcon={<ClearAllRoundedIcon />} disabled={loading}>
          모두 읽기
        </Button>
      </div>
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
    </>
  );
}
