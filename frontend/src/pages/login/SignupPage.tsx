import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { signupApi } from "@/api/authApi";
import SignupInput from "@/components/input/SignupInput";

function SignupPage() {
  const navigate = useNavigate();

  type FormKey = "email" | "password" | "passwordConfirm" | "nickname";

  const [form, setForm] = useState<Record<FormKey, string>>({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
  });

  const [valid, setValid] = useState<Record<FormKey, boolean>>({
    email: false,
    password: false,
    passwordConfirm: false,
    nickname: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* 회원가입 FORM 유효성 검사 */
  useEffect(() => {
    setValid({
      email: /\S+@\S+\.\S+/.test(form.email),
      password: form.password.length >= 8,
      passwordConfirm:
        form.password === form.passwordConfirm && form.passwordConfirm !== "",
      nickname: form.nickname.length >= 2,
    });
  }, [form]);

  /* 회원가입 input 상태 관리 onChange */
  const handleChange = (key: FormKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const allValid = Object.values(valid).every(Boolean);

  const handleSubmit = async () => {
    if (!allValid || isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await signupApi({
        email: form.email,
        password: form.password,
        nickname: form.nickname,
      });

      if (response.status === 201) {
        alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
        navigate("/auth/login");
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
    <div className="flex min-h-screen w-full items-center justify-center font-suitExtraLight text-gray-800">
      <div className="flex w-1/4 flex-col items-center space-y-10">
        <div className="w-full text-left">
          <button
            type="button"
            className="btn-hover-scale-110"
            onClick={() => navigate("/")}
          >
            <HomeFilledIcon /> Home
          </button>
        </div>
        <h1 className="text-3xl"> SIGNUP </h1>

        {/* form */}

        <SignupInput
          type="text"
          placeholder="이메일"
          value={form.email}
          isValid={valid.email}
          onChange={(e) => handleChange("email", e.target.value)}
          errorMessage="유효한 이메일을 입력해주세요."
        />
        <div className="flex w-full flex-col items-center space-y-3">
          <div className="w-full space-y-2">
            <SignupInput
              type="password"
              placeholder="비밀번호"
              value={form.password}
              isValid={valid.password}
              onChange={(e) => handleChange("password", e.target.value)}
              errorMessage="비밀번호는 8자리 이상 입력해주세요."
            />

            <SignupInput
              type="password"
              placeholder="비밀번호확인"
              value={form.passwordConfirm}
              isValid={valid.passwordConfirm}
              onChange={(e) => handleChange("passwordConfirm", e.target.value)}
              errorMessage="비밀번호가 일치하지 않습니다."
            />
          </div>
        </div>

        <SignupInput
          type="text"
          placeholder="닉네임"
          value={form.nickname}
          isValid={valid.nickname}
          onChange={(e) => handleChange("nickname", e.target.value)}
          errorMessage="닉네임은 두 글자 이상 입력하세요."
        />

        <div className="w-full items-center text-right">
          {error && <p className="mb-2 text-sm text-red-500">{error}</p>}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allValid || isLoading}
            className={clsx(
              "rounded-lg bg-indigo-600 px-4 py-2 text-white",
              allValid ? "bg-indigo-600" : "cursor-not-allowed bg-gray-300"
            )}
          >
            {isLoading ? "가입 중..." : "가입하기"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
