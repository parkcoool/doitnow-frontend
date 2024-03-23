/** @jsxImportSource @emotion/react */
import { Paper, Skeleton, Typography, styled } from "@mui/material";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";

import type { TypographyProps } from "@mui/material/Typography";
import type { PublicProfile } from "user";

interface DetailProps {
  profile: PublicProfile | undefined;
}

const DetailName = styled(Typography)<TypographyProps>({
  display: "flex",
  alignContent: "center",
  gap: "4px",
  fontWeight: 600,
});

export default function Detail({ profile }: DetailProps) {
  return (
    <Paper
      css={{
        width: "100%",
        marginTop: "24px",
      }}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          padding: "12px",
        }}
      >
        {profile ? (
          <>
            <DetailName>
              <DateRangeRoundedIcon />
              계정 생성
            </DetailName>
            <Typography>{profile.createdAt.toLocaleDateString()}</Typography>
          </>
        ) : (
          <Skeleton width="100%" animation="wave" />
        )}
      </div>
    </Paper>
  );
}
