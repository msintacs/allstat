import apiClient from "@/api/apiClient";

interface SignupData {
  email: string;
  password: string;
  nickname: string;
}

export const signupApi = async (data: SignupData) => {
  return await apiClient.post("/auth/signup", data);
};
