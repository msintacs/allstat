import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";

function Layout() {
  return (
    <div className="font-suitExtraLight flex min-h-screen flex-col">
      <Header />
      <main className="w-full flex-1 px-8 pt-[88px]">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
