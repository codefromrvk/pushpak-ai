import { createContext, useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [auth, setAuth] = useState({});

  return <AuthContext.Provider value={{ auth, setAuth }} {...props} />;
};

export default AuthProvider;

// useEffect(() => {
//   console.log("h", localStorage.getItem("login"), auth);
//   if (localStorage.getItem("login")) {
//     setAuth(JSON.parse(localStorage.getItem("access-token")));
//   } else {
//     localStorage.setItem("login", false);
//   }
//   // localStorage.getItem("access-token");
//   if (!auth) {
//     console.log("No auth");
//     setAuth(JSON.parse(localStorage.getItem("access-token")));
//   }
// }, [setAuth, auth]);
