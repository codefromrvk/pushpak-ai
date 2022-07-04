import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

const PersistedLogin = () => {
  // const [login, setLogin] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  console.log("persisted");
  console.log("load", loading);
  useEffect(() => {
    function getData() {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        setAuth(userInfo);
      }
      setIsLoading(false);
    }

    !auth.username ? getData() : setIsLoading(false);
  }, [auth]);

  return !loading && <Outlet />;

  //   : <Navigate to="/login" replace />;
};

export default PersistedLogin;
