/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";

import Header from "components/layout/Header";
import Footer, { Tab } from "components/layout/Footer";

const layoutStyle = css({
  display: "flex",
  flexDirection: "column",
});

interface LayoutProps {
  children: React.ReactNode;
  loading?: boolean;
  tab?: Tab;
  headerContent?: React.ReactNode;
  headerDisabled?: boolean;
  footerDisabled?: boolean;
}

export default function Layout({
  children,
  loading = false,
  tab,
  headerContent,
  headerDisabled = false,
  footerDisabled = false,
}: LayoutProps) {
  return (
    <div css={layoutStyle}>
      {!headerDisabled && (
        <div
          css={{
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <Header content={headerContent} loading={loading} />
        </div>
      )}

      <main
        css={{
          paddingBottom: footerDisabled ? 0 : "64px",
        }}
      >
        {children}
      </main>
      {!footerDisabled && <Footer selectedTab={tab} />}
    </div>
  );
}
