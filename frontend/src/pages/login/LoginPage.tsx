import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="font-suitExtraLight flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center">
          <button
            type="button"
            className="btn-hover-scale-110 text-gray-800"
            onClick={() => navigate(-1)}
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
            placeholder="아이디 또는 이메일"
            className="w-full border-b border-gray-300 py-3 text-base placeholder-gray-400 focus:border-indigo-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full border-b border-gray-300 py-3 text-base placeholder-gray-400 focus:border-indigo-500 focus:outline-none"
          />

          <div className="flex space-x-2.5 text-sm text-gray-700">
            <button
              type="button"
              className="btn-hover-scale-105 text-gray-800"
              onClick={() => navigate("/signup")}
            >
              회원가입
            </button>
            <button type="button" className="btn-hover-scale-105 text-gray-800">
              비밀번호 찾기
            </button>
          </div>

          <button
            type="submit"
            className="mt-1 rounded bg-indigo-600 py-3 text-white transition hover:bg-indigo-700"
          >
            로그인
          </button>

          <div className="mt-6 text-center text-sm text-gray-500">
            SNS로 간편 로그인
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
