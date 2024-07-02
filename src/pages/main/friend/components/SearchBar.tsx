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

import SearchItem from "./SearchItem";

import type { TextFieldProps } from "@mui/material";

export interface UserSearchResult {
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

    if (inputValue.length < 2) {
      setSearchResults([]);
      return;
    }

    let canceled = false;
    setLoading(true);
    searchUser({ query: inputValue }, accessToken.token).then((results) => {
      if (canceled) return;
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
          freeSolo
          inputValue={inputValue}
          onInputChange={(_, value) => setInputValue(value)}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.username
          }
          options={searchResults}
          filterOptions={(x) => x}
          open={inputValue.length > 2}
          renderOption={(props, option) => (
            <SearchItem
              {...props}
              {...option}
              query={inputValue}
              key={option.id}
            />
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              {...props}
              size="small"
              placeholder="사용자 검색"
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
