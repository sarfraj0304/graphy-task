import axios from "axios";

const axiosInterceptor = axios.create({
  baseURL: "https://api.github.com",
});

axiosInterceptor.interceptors.request.use(
  (config) => {
    const token = process.env.REACT_APP_GITHUB_TOKE;
    if (token) {
      config.headers["Authorization"] = `bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInterceptor;
