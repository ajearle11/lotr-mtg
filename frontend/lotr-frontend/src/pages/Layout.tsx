import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow max-w-[1500px] w-[100%] mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
