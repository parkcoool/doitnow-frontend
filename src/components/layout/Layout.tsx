/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";

import Header from "components/layout/Header";
import Footer from "components/layout/Footer";

const layoutStyle = css({
  display: "flex",
  flexDirection: "column",
});

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div css={layoutStyle}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
