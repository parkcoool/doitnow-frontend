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
  loading?: boolean;
  headerContent?: React.ReactNode;
  footerDisabled?: boolean;
}

export default function Layout({ children, loading = false, headerContent, footerDisabled = false }: LayoutProps) {
  return (
    <div css={layoutStyle}>
      <div
        css={{
          position: "sticky",
          top: 0,
        }}
      >
        <Header content={headerContent} loading={loading} />
      </div>

      <main>{children}</main>
      {!footerDisabled && <Footer />}
    </div>
  );
}
