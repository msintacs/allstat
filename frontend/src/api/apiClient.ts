import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: baseURL,
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // localStorage에서 토큰을 가져온다.
    const token = localStorage.getItem("accessToken");

    if (token) {
      // 토큰이 있으면 헤더에 'Authorization' 필드를 추가한다.
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
