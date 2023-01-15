import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();

  const { user } = useSelector((state) => state.user);

  return !user ? (
    <Navigate to="/signin" state={{ path: location.pathname }} />
  ) : (
    <Outlet />
  );
};

export default PrivateRoute;
