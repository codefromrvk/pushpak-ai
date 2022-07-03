import { Outlet } from "react-router-dom";
const Layout = () => {
  console.log("Layout");
  return (
    <main className="App">
      <Outlet />
    </main>
  );
};

export default Layout;
