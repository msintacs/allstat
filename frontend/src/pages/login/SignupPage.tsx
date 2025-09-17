import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const allValid = Object.values(valid).every(Boolean);

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
          <button
            type="button"
            className={clsx(
              "rounded-lg bg-indigo-600 px-4 py-2 text-white",
              allValid ? "bg-indigo-600" : "cursor-not-allowed bg-gray-300"
            )}
          >
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
