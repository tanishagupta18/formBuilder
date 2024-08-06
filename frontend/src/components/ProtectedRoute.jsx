
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthenticate } from "../Contexts/AuthContext";

const fullPageStyle = {
  height: '100vh',
  backgroundColor: 'var(--color-grey-50)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticate } = useAuthenticate();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticate && !isLoading) navigate("/");
    },
    [isAuthenticate, isLoading, navigate]
  );

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <div style={fullPageStyle}>
        <Spinner />
      </div>
    );

  // 4. If there IS a user, render the app
  return isAuthenticate ? children : null;
}

export default ProtectedRoute;