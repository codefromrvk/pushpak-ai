import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";

import Login from "./components/auth/Login";
import RequireAuth from "./components/auth/RequireAuth";
import ResetPassword from "./components/auth/ResetPassword";

const App = () => {
  console.log("App");
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="passwordreset" element={<ResetPassword />} />

        {/* Private rotes */}

        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
