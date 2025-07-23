import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "@/components/layout/Sidebar";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full">
        {/* 안내 바 */}
        <div className="bg-indigo-950 px-8 py-2 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-[15px]">
              지금 참여하고, 모두의 생각을 한눈에 확인하세요.
            </h1>
            <div className="flex items-center space-x-2.5 text-sm">
              <div className="btn-hover-scale-105">
                <button
                  type="button"
                  className="btn-hover-scale-105"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </div>
              <div className="btn-hover-scale-125">
                <SearchIcon fontSize="small" />
              </div>
            </div>
          </div>
        </div>

        {/* 메인 헤더 */}
        <div className="flex h-12 items-center bg-white px-8 text-2xl shadow-md">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="btn-hover-scale-125"
          >
            <MenuIcon fontSize="inherit" />
          </button>
        </div>
      </header>

      {isOpen && <Sidebar onClose={() => setIsOpen(false)} />}
    </>
  );
}

export default Header;
