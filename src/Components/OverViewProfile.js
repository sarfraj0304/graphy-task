import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UserProfile from "./UserProfile";
import Repositories from "./Repositories";
import { useLocation } from "react-router";
import axiosInterceptor from "../Utils/AxiosInterceptor";
import { useEffect, useState } from "react";

export default function OverViewProfile() {
  const [value, setValue] = useState("1");
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {
    state: { username },
  } = useLocation();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch GitHub user profile
        const profileResponse = await axiosInterceptor.get(
          `/users/${username}`
        );

        // Fetch GitHub user's repositories
        const reposResponse = await axiosInterceptor.get(
          `/users/${username}/repos`
        );
        setProfile(profileResponse.data);
        setRepos(reposResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          "Failed to load profile. Please check the username or API token."
        );
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            backgroundColor: "#010409",
            p: 1,
          }}
        >
          <TabList onChange={handleChange}>
            <Tab label="Overview" value="1" sx={{ color: "white" }} />
            <Tab
              label={`Repository (${repos?.length})`}
              value="2"
              sx={{ color: "white" }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <UserProfile
            username={username}
            repos={repos}
            loading={loading}
            profile={profile}
            error={error}
          />
        </TabPanel>
        <TabPanel value="2">
          <Repositories
            username={username}
            fullView={true}
            repos={repos}
            loading={loading}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
