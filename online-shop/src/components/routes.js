import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  USER_ROUTE,
  DASHBOARD_ROUTE,
  ADMIN_ROUTE,
} from "../utils/paths";
import Homepage from "../pages/Homepage/Homepage";
import Registration from "../pages/Registration/Registration";
import LoginPage from "../pages/LoginPage/LoginPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import Admin from "../pages/Admin/Admin";

export const authRoutes = [
  {
    path: DASHBOARD_ROUTE,
    Component: Dashboard,
  },
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
];

export const publicRoutes = [
  {
    path: REGISTRATION_ROUTE,
    Component: Registration,
  },
  {
    path: LOGIN_ROUTE,
    Component: LoginPage,
  },
  {
    path: USER_ROUTE,
    Component: Homepage,
  },
];
