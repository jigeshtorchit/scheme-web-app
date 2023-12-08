import { lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Loader from "../pages/loader/Loader";
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";
import DashboardLayout from "../pages/dashboard/DashboardLayout";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      children: [
        {
          path: "/",
          element: (
            <GuestGuard>
              <ChatBot />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: "admin",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: "/admin/scheme",
          element: (
            <AuthGuard>
              <Scheme />
            </AuthGuard>
          ),
        },
        {
          path: "/admin/add-scheme",
          element: (
            <AuthGuard>
              <AddScheme />
            </AuthGuard>
          ),
        },
        {
          path: "/admin/edit-scheme/:id",
          element: (
            <AuthGuard>
              <EditScheme />
            </AuthGuard>
          ),
        },
      ],
    },
    {
      path: "*",
      children: [
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}

const ChatBot = Loadable(lazy(() => import("../components/ChatBot")));
const Login = Loadable(lazy(() => import("../pages/loginForms/Login")));
const NotFound = Loadable(lazy(() => import("../pages/404/Page404")));
const Scheme = Loadable(lazy(() => import("../pages/scheme/Scheme")));
const AddScheme = Loadable(lazy(() => import("../pages/scheme/SchemeAddForm")));
const EditScheme = Loadable(
  lazy(() => import("../pages/scheme/SchemeEditForm"))
);
