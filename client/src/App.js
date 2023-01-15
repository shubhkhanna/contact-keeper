import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./components/PrivateRoute";
import { AppRoutes } from "./utils/routes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path={AppRoutes.home} element={<HomePage />} />
        </Route>

        {/* Public Routes */}
        <Route path={AppRoutes.signin} element={<SigninPage />} />
        <Route path={AppRoutes.signup} element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
