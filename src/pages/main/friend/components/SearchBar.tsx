/** @jsxImportSource @emotion/react */
import React from "react";

import {
  Autocomplete,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import searchUser from "apis/searchUser";
import Narrow from "components/layout/Narrow";
import useSessionStore from "contexts/useSessionStore";

import type { TextFieldProps } from "@mui/material";

interface UserSearchResult {
  id: number;
  name: string;
  username: string;
  profileImage: string | null;
}

export default function SeachBar(props: TextFieldProps) {
  const session = useSessionStore();

  const [loading, setLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<UserSearchResult[]>(
    []
  );

  React.useEffect(() => {
    const accessToken = session.accessToken;
    if (accessToken === null) return;

    if (inputValue.length < 3) {
      setSearchResults([]);
      return;
    }

    let canceled = false;
    setLoading(true);
    searchUser({ query: inputValue }, accessToken.token).then((results) => {
      if (canceled) {
        return;
      }
      setLoading(false);
      setSearchResults(results.data.users);
    });

    return () => {
      canceled = true;
    };
  }, [inputValue]);

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
        <Autocomplete
          inputValue={inputValue}
          onInputChange={(_, value) => setInputValue(value)}
          options={searchResults}
          getOptionLabel={(option) => option.name}
          open={inputValue.length > 2}
          renderInput={(params) => (
            <TextField
              {...params}
              {...props}
              size="small"
              placeholder="이름 또는 사용자 이름을 이용하여 사용자 검색"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </Narrow>
    </div>
  );
}
