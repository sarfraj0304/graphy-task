import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Avatar,
  Grid2,
  Box,
  CircularProgress,
  Pagination,
  InputAdornment,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axiosInterceptor from "../Utils/AxiosInterceptor";
import { useNavigate } from "react-router";

const UserLists = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [handler, setHandler] = useState({
    error: null,
    loading: false,
  });
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  async function HandleGetData() {
    setHandler((prev) => ({ ...prev, loading: true }));
    const res = await axiosInterceptor.get(
      `/search/users?q=${query}&page=${page}&per_page=${10}`
    );
    if (!res?.data?.items?.length) {
      setHandler((prev) => ({ ...prev, error: "Data Not Found!" }));
    }
    setData(res?.data);
    setHandler((prev) => ({ ...prev, loading: false, error: null }));
  }

  useEffect(() => {
    query && HandleGetData();
  }, [page]);

  const handleSearch = () => {
    if (query) {
      HandleGetData();
    }
  };

  return (
    <Grid2>
      <Grid2
        sx={{
          bgcolor: "#010409",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          padding: 1,
          width: "100%",
        }}
      >
        <TextField
          variant="outlined"
          value={query}
          placeholder="Type to Search Github User"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            border: "1px solid grey",
            transition: "all 0.5s",
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "white",
            },
            "& .MuiInputBase-root": {
              height: "35px",
              borderRadius: "10px",
            },
            "&:hover": {
              border: "1px solid white",
            },
            borderRadius: "10px",
            width: focused
              ? { xs: "100%", sm: "100%", md: "80%" }
              : { xs: "90%", sm: "80%", md: "25%" },
          }}
        />
      </Grid2>

      <Grid2 sx={{ width: "100%", textAlign: "left", p: 1 }}>
        <Typography variant="body">
          GitHub User List / {data?.total_count || 0} Results
        </Typography>
      </Grid2>

      {handler?.error && (
        <Typography variant="body1" color="error" align="center">
          {handler?.error}
        </Typography>
      )}

      <Grid2 style={{ marginTop: "10px" }}>
        {handler?.loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "70vh",
            }}
          >
            <CircularProgress size={40} sx={{ color: "#1976d2" }} />
          </Box>
        ) : !data?.items?.length ? (
          <Typography
            variant="body1"
            color="error"
            align="center"
            sx={{ fontSize: "25px" }}
          >
            {"User Not Found!"}
          </Typography>
        ) : (
          <Grid2
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gridTemplateRows: "auto",
            }}
          >
            {data?.items?.map((user) => (
              <Grid2 key={user.id}>
                <Grid2
                  onClick={() => {
                    navigate("/user-profile", {
                      state: { username: user?.login },
                    });
                  }}
                  sx={{
                    p: 1,
                    border: "1px solid #373e47",
                    borderRadius: 2,
                    width: "90%",
                    margin: "auto",
                    mb: 2,
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: "#161c25",
                    },
                  }}
                >
                  <Grid2 container spacing={3} alignItems="center">
                    <Grid2 item>
                      <Avatar
                        src={user?.avatar_url}
                        alt={"User Image"}
                        variant="rounded"
                        sx={{ height: "50px", width: "50px" }}
                      />
                    </Grid2>
                    <Grid2 item sx={{ textAlign: "left" }}>
                      <Typography variant="h6" sx={{ color: "#1976d2" }}>
                        {`${user?.login}`}
                      </Typography>
                      <Chip
                        label={`${user?.type}/${user?.login}`}
                        sx={{
                          bgcolor: "#121d2f",
                          color: "#3c88eb",
                          height: "20px",
                          fontSize: "12px",
                        }}
                      />
                    </Grid2>
                  </Grid2>
                </Grid2>
              </Grid2>
            ))}
          </Grid2>
        )}
      </Grid2>

      {data?.items?.length ? (
        <Grid2
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Pagination
            count={data?.total_count}
            page={page === 0 ? 1 : page}
            onChange={(e, v) => {
              setPage(v);
            }}
            color="primary"
            sx={{
              color: "white",
              "& .MuiPaginationItem-root": {
                color: "white",
              },
            }}
          />
        </Grid2>
      ) : null}
    </Grid2>
  );
};

export default UserLists;
