import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = localStorage.getItem("token");

  if (!auth) {
    <h1>You are not authorized to access this page!</h1>;
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
