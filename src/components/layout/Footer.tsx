/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import styled from "@mui/system/styled";
import Typography from "@mui/material/Typography";

import {
  HomeOutlined as HomeOutlinedIcon,
  PeopleOutline as PeopleOutlineIcon,
  NotificationsOutlined as NotificationsOutlinedIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

import type { ButtonProps } from "@mui/material";

const FooterButton = styled(Button)<ButtonProps>({
  flexGrow: "1",
  height: "80%",
  maxWidth: "64px",
  flexDirection: "column",
  borderRadius: "12px",
});

const FooterButtonTypography = styled(Typography)({
  fontSize: "12px",
  fontWeight: 600,
});

export enum Tab {
  Home = "home",
  Friend = "friend",
  Notification = "notification",
  My = "my",
}

interface FooterProps {
  selectedTab?: Tab;
  notificationCount?: number;
}

export default function Footer({ selectedTab, notificationCount }: FooterProps) {
  const navigate = useNavigate();

  function getColor(tab: Tab) {
    return selectedTab === tab ? "primary" : "inherit";
  }

  return (
    <footer
      css={{
        position: "fixed",
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
        height: "64px",
        padding: "0 8px",
        borderRadius: "16px 16px 0 0",
        boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
        zIndex: 100,
      }}
    >
      <FooterButton color={getColor(Tab.Home)} onClick={() => navigate("/", { replace: true })}>
        {selectedTab === Tab.Home ? <HomeIcon color="inherit" /> : <HomeOutlinedIcon color="inherit" />}
        <FooterButtonTypography color="inherit">홈</FooterButtonTypography>
      </FooterButton>

      <FooterButton color={getColor(Tab.Friend)} onClick={() => navigate("/friend", { replace: true })}>
        {selectedTab === Tab.Friend ? <PeopleIcon color="inherit" /> : <PeopleOutlineIcon color="inherit" />}
        <FooterButtonTypography color="inherit">친구</FooterButtonTypography>
      </FooterButton>

      <FooterButton color={getColor(Tab.Notification)} onClick={() => navigate("/notification", { replace: true })}>
        <Badge
          color="primary"
          badgeContent={notificationCount}
          css={{
            "& .MuiBadge-badge": {
              width: "16px",
              height: "16px",
              padding: "0",
            },
          }}
        >
          {selectedTab === Tab.Notification ? (
            <NotificationsIcon color="inherit" />
          ) : (
            <NotificationsOutlinedIcon color="inherit" />
          )}
        </Badge>
        <FooterButtonTypography color="inherit">알림</FooterButtonTypography>
      </FooterButton>

      <FooterButton color={getColor(Tab.My)} onClick={() => navigate("/my", { replace: true })}>
        {selectedTab === Tab.My ? <AccountCircleIcon color="inherit" /> : <AccountCircleOutlinedIcon color="inherit" />}
        <FooterButtonTypography color="inherit">나</FooterButtonTypography>
      </FooterButton>
    </footer>
  );
}
