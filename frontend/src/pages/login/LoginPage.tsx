import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginApi } from "@/api/authApi";

function LoginPage() {
  const navigate = useNavigate();

  type FormKey = "email" | "password";

  const [form, setForm] = useState<Record<FormKey, string>>({
    email: "",
    password: "",
  });

  const [valid, setValid] = useState<Record<FormKey, boolean>>({
    email: false,
    password: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 로그인 FORM 유효성 검사
  useEffect(() => {
    setValid({
      email: /\S+@\S+\.\S+/.test(form.email),
      password: form.password.length >= 8,
    });
  }, [form]);

  const handleChange = (key: FormKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const allValid = Object.values(valid).every(Boolean);

  const handleSubmit = async () => {
    if (!allValid || isLoading) {
      alert("입력하신 아이디 또는 비밀번호를 확인하여주세요.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await loginApi(form);

      if (response.status === 200) {
        // 1. 응답 헤더에서 토큰 꺼내기
        const bearerToken = response.headers["authorization"];

        // 2. "Bearer " 부분 자르기 (실제 토큰 값만 저장)
        const token = bearerToken.split(" ")[1];

        // 3. 토큰을 localStorage에 저장
        localStorage.setItem("accessToken", token);

        // 4. 메인페이지로 이동
        alert("로그인 성공. 메인 페이지로 이동합니다.");
        navigate("/");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(
          err.response.data.message || "알 수 없는 에러가 발생했습니다."
        );
      } else {
        setError("네트워크 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 font-suitExtraLight">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center">
          <button
            type="button"
            className="btn-hover-scale-110 text-gray-800"
            onClick={() => navigate("/")}
          >
            <KeyboardBackspaceIcon fontSize="large" />
          </button>
        </div>
        <h1 className="mb-10 text-center text-3xl font-bold text-gray-800">
          LOGIN
        </h1>

        <form className="flex flex-col gap-6">
          <input
            type="text"
            value={form.email}
            placeholder="아이디 또는 이메일"
            className="w-full border-b border-gray-300 py-3 text-base placeholder-gray-400 focus:border-indigo-500 focus:outline-none"
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <input
            type="password"
            value={form.password}
            placeholder="비밀번호"
            className="w-full border-b border-gray-300 py-3 text-base placeholder-gray-400 focus:border-indigo-500 focus:outline-none"
            onChange={(e) => handleChange("password", e.target.value)}
          />

          <div className="flex space-x-2.5 text-sm text-gray-700">
            <button
              type="button"
              className="btn-hover-scale-105 text-gray-800"
              onClick={() => navigate("/auth/signup")}
            >
              회원가입
            </button>
            <button type="button" className="btn-hover-scale-105 text-gray-800">
              비밀번호 찾기
            </button>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="mt-1 rounded bg-indigo-600 py-3 text-white transition hover:bg-indigo-700"
          >
            로그인
          </button>

          <div className="mt-6 text-center text-sm text-gray-500">
            SNS 간편 로그인
          </div>

          <div className="flex flex-col gap-3">
            <button className="rounded bg-green-500 py-2 text-white hover:bg-green-600">
              네이버 로그인
            </button>
            <button className="rounded bg-yellow-400 py-2 text-black hover:bg-yellow-500">
              카카오 로그인
            </button>
            <button className="rounded bg-red-500 py-2 text-white hover:bg-red-600">
              구글 로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
