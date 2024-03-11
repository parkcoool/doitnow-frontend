/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Layout from "components/layout/Layout";
import Narrow from "components/layout/Narrow";

import type { LocationState } from "location";

type RecoveryLocationState = LocationState;

export default function Recovery() {
  const navigate = useNavigate();
  const location = useLocation();

  const { sourceLocation } = (location.state ?? {}) as RecoveryLocationState;

  return (
    <Layout
      headerContent="계정 복구"
      
      onBack={sourceLocation ? () => navigate(sourceLocation.pathname, { state: sourceLocation.state }) : undefined}
      footerDisabled
    >
      <Narrow>a</Narrow>
    </Layout>
  );
}
