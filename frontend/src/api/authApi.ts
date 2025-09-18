import apiClient from "@/api/apiClient";

interface SignupData {
  email: string;
  password: string;
  nickname: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const signupApi = async (data: SignupData) => {
  return await apiClient.post("/auth/signup", data);
};

export const loginApi = async (data: LoginData) => {
  return await apiClient.post("/auth/login", data);
};
