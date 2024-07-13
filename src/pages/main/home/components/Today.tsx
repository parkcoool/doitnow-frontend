import { Paper } from "@mui/material";

interface TodayProps {
  doneTaskCount: number;
  totalTaskCount: number;
}

export default function Today({ doneTaskCount, totalTaskCount }: TodayProps) {
  return <Paper></Paper>;
}
