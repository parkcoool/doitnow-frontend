import { Skeleton } from "@mui/material";

import Defer from "components/common/Defer";

import type { SkeletonProps } from "@mui/material";

export default function DeferredSkeleton(props: SkeletonProps) {
  return (
    <Defer>
      <Skeleton {...props} />
    </Defer>
  );
}
