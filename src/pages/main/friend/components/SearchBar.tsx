/** @jsxImportSource @emotion/react */
import { InputAdornment, TextField } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import Narrow from "components/layout/Narrow";

export default function SeachBar() {
  return (
    <div
      css={{
        width: "100%",
        padding: "12px 0",
        backgroundColor: "white",
        display: "flex",
      }}
    >
      <Narrow>
        <TextField
          size="small"
          placeholder="사용자 검색"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />
      </Narrow>
    </div>
  );
}
