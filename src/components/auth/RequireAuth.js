import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  console.log("Required auth", auth);

  return auth?.username ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
    //send user to login page because he is not logged in
    //gives the from location (where we came from)
    //back button in the browser
  );
};

export default RequireAuth;
