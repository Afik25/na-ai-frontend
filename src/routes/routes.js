import MainLayout from "../MainLayout";
import PersistLogin from "../state/context/hooks/PersistLogin";
import RequireAuth from "../state/context/hooks/RequireAuth";
// pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import QA from "../pages/QA";
import Administration from "../pages/Administration";
import Collector from "../pages/Collector";
//
// layouts
import Dashboard from "../pages/layouts/Dashboard";
import User from "../pages/layouts/User";
//
import NotFound from "../pages/404";
import Unauthorized from "../pages/Unauthorized";

const ROLES = {
  admin: "admin",
  user: "user",
  student: "student",
};

export const routes = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/qa", element: <QA /> },
      {
        element: <PersistLogin />,
        children: [
          {
            element: <RequireAuth allowedRoles={[ROLES.admin]} />,
            children: [
              {
                path: "/admin",
                element: <Administration />,
                children: [
                  { path: "/admin", element: <Dashboard /> },
                  { path: "users", element: <User /> },

                ],
              },
            ],
          },
        ],
      },
      // {
      //   element: <PersistLogin />,
      //   children: [
      //     {
      //       element: <RequireAuth allowedRoles={[ROLES.user]} />,
      //       children: [
      //         { path: "/user", element: <Collector /> },
      //       ],
      //     },
      //   ],
      // },
      { path: "/user", element: <Collector /> },
      { path: "*", element: <NotFound /> },
      { path: "/unauthorized", element: <Unauthorized /> },
    ],
  },
];
