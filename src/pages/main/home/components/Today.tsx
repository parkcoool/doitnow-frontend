/** @jsxImportSource @emotion/react */
import React from "react";

import {
  Button,
  LinearProgress,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import styled from "@emotion/styled";

const QuickButton = styled(Button)(({ theme }) => ({
  borderRadius: 5,
  padding: "5px 10px",
  fontSize: 14,
  fontWeight: 500,
}));

export interface TodayProps {
  username?: string;
  doneTaskCount?: number;
  totalTaskCount?: number;
}

export default function Today({
  username,
  doneTaskCount,
  totalTaskCount,
}: TodayProps) {
  const [message, setMessage] = React.useState<string>();

  const progressValue =
    totalTaskCount === undefined
      ? 0
      : ((doneTaskCount ?? 0) / totalTaskCount) * 100;

  React.useEffect(() => {
    if (
      username !== undefined &&
      doneTaskCount !== undefined &&
      totalTaskCount !== undefined
    ) {
      if (totalTaskCount === 0)
        setMessage(`${username}님, 오늘 할 일이 없어요! 😊`);
      else
        setMessage(
          `${username}님, 오늘 ${doneTaskCount}개 중 ${totalTaskCount}개 완료했어요!`
        );
    }
  }, [username, doneTaskCount, totalTaskCount]);

  return (
    <Paper
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "20px",
      }}
    >
      <Typography variant="h1" fontSize={24} fontWeight={500}>
        {message ?? <Skeleton width={200} animation="wave" />}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progressValue}
        css={{
          height: 10,
          borderRadius: 5,
        }}
      />
      <div>
        <QuickButton startIcon={<AddRoundedIcon />} color="inherit">
          할 일 추가하기
        </QuickButton>
      </div>
    </Paper>
  );
}
