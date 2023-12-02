import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
// hooks
import useAuth from "../hooks/useAuth";

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={"/admin/scheme"} />;
  }

  return <>{children}</>;
}
