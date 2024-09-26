import React from "react";
import {
  Container,
  Avatar,
  Typography,
  Grid2,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LinkIcon from "@mui/icons-material/Link";
import Repositories from "./Repositories";

const UserProfile = ({ username, repos, loading, error, profile }) => {
  const handleGetCurrentTime = () => {
    const newTime = new Date();
    const getHr = newTime.getHours().toString().padStart(2, "0");
    const getMin = newTime.getMinutes().toString().padStart(2, "0");
    return `${getHr}:${getMin}`;
  };

  if (loading) {
    return (
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
    );
  }

  if (error) {
    return (
      <Grid2>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Grid2>
    );
  }

  return (
    <Container maxWidth="xl" style={{ marginTop: "10px" }}>
      {profile && (
        <Grid2
          spacing={3}
          sx={{
            display: { sm: "grid", md: "flex", lg: "flex" },
            justifyContent: "space-evenly",
            color: "white",
          }}
        >
          <Grid2
            sx={{
              width: { sm: "100%", md: "30%", lg: "30%" },
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "left",
              p: 1,
            }}
          >
            <Avatar
              alt={profile.name}
              src={profile.avatar_url}
              style={{ width: "250px", height: "250px" }}
            />
            <Grid2 sx={{ width: "100%", mt: 1 }}>
              <Typography variant="h5">
                {profile.name || profile.login}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "GrayText", fontSize: "18px" }}
              >
                {profile.login}
              </Typography>
            </Grid2>

            {/* bio */}
            <Typography variant="body1" sx={{ mt: 2, fontSize: "15px" }}>
              {profile.bio}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              href={profile.html_url}
              target="_blank"
              sx={{ marginTop: "10px", width: "100%" }}
            >
              View GitHub Profile
            </Button>

            {/* followers */}
            <Grid2
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                gap: 1,
                mt: 1,
              }}
            >
              <GroupIcon sx={{ fontSize: "20px" }} />
              <Typography variant="body1" sx={{ fontSize: "15px" }}>
                {`${profile.followers} followers `}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "15px" }}>
                {`.`}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "15px" }}>
                {` ${profile.following} following`}
              </Typography>
            </Grid2>

            {/* extra info */}
            {profile.company && (
              <Grid2
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: 1,
                  mt: 2,
                }}
              >
                <ApartmentIcon sx={{ fontSize: "20px" }} />
                <Typography variant="body2">{profile.company}</Typography>
              </Grid2>
            )}
            {profile?.location && (
              <Grid2
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: 1,
                  mt: 1,
                }}
              >
                <LocationOnIcon sx={{ fontSize: "20px" }} />
                <Typography variant="body2">{profile?.location}</Typography>
              </Grid2>
            )}

            <Grid2
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                gap: 1,
                mt: 1,
              }}
            >
              <AccessTimeIcon sx={{ fontSize: "20px" }} />
              <Typography variant="body2">
                {handleGetCurrentTime()}{" "}
                <span style={{ fontSize: "13px", color: "GrayText" }}>
                  (UTC +05:30)
                </span>
              </Typography>
            </Grid2>

            {profile?.blog && (
              <Grid2
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: 1,
                  mt: 1,
                }}
              >
                <LinkIcon sx={{ fontSize: "20px" }} />
                <Typography variant="body2">{profile?.blog}</Typography>
              </Grid2>
            )}
          </Grid2>

          {/* Repositories */}
          <Grid2
            sx={{
              width: { sm: "100%", md: "70%", lg: "70%" },
              border: "1px solid gray",
              p: 1,
              borderRadius: 2,
            }}
          >
            <Typography sx={{ fontSize: "20px" }}>
              {`Hii My name is ${profile.name || profile.login}`}
            </Typography>
            <Repositories username={username} repos={repos} loading={loading} />
          </Grid2>
        </Grid2>
      )}
    </Container>
  );
};

export default UserProfile;
