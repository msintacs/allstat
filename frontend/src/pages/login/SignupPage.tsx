import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import { useNavigate } from "react-router-dom";
import SignupInput from "@/components/input/SignupInput";
import { useState } from "react";

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
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
          placeholder="이메일"
          value={form.email}
          isValid={false}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <div className="flex w-full flex-col items-center space-y-3">
          <SignupInput
            placeholder="비밀번호"
            value={form.password}
            isValid={false}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <SignupInput
            placeholder="비밀번호확인"
            value={form.passwordConfirm}
            isValid={false}
            onChange={(e) => handleChange("passwordConfirm", e.target.value)}
          />
        </div>
        <SignupInput
          placeholder="닉네임"
          value={form.nickname}
          isValid={false}
          onChange={(e) => handleChange("nickname", e.target.value)}
        />
        <div className="w-full items-center text-right">
          <button
            type="button"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
          >
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
