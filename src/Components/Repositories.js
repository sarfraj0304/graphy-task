import {
  Box,
  CardContent,
  Chip,
  CircularProgress,
  Grid2,
  Typography,
} from "@mui/material";
import React from "react";

const Repositories = ({ username, repos, ...props }) => {
  return props?.loading ? (
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
  ) : (
    <Grid2
      sx={{
        width: "100%",
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "left", p: 2 }}>
        Repositories
      </Typography>
      <Grid2 container>
        {repos?.map((repo) => (
          <Grid2
            item
            xs={12}
            key={repo.id}
            sx={{
              width: "100%",
              color: "white",
              borderBottom: "1px solid",
              textAlign: "left",
            }}
          >
            <CardContent>
              <Grid2 sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="h6">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    style={{
                      color: "#1976d2",
                      wordBreak: "break-word",
                    }}
                  >
                    {repo.name}
                  </a>
                </Typography>
                <Chip
                  label={`${repo?.visibility}`}
                  sx={{
                    color: "aquamarine",
                    height: "20px",
                    fontSize: "12px",
                    border: "1px solid",
                  }}
                />
              </Grid2>
              <Typography
                variant="body2"
                sx={{
                  color: "GrayText",
                  fontSize: "13px",
                }}
              >
                {repo.description || "No description available."}
              </Typography>
              <Grid2 sx={{ mt: repo?.topics?.length ? 1 : 0 }}>
                {repo?.topics?.map((el, i) => {
                  return (
                    <Chip
                      key={i}
                      label={`${el}`}
                      sx={{
                        color: "#f9e79f",
                        height: "20px",
                        fontSize: "12px",
                        border: "1px solid",
                        ml: 1,
                      }}
                    />
                  );
                })}
              </Grid2>
            </CardContent>
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
};

export default Repositories;
