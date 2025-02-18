import React from "react";
import { Navigate } from "react-router-dom";
import authService from "../Authentication/authService";

function ProtectedRoute({ children }) {
  if (authService.isAuthenticateduser()) {
    if (authService.isAuthenticateduser()) {
      return children;
    } else {
      return <Navigate to="/Login" replace />;
    }
  } else {
    return <Navigate to="/Login" replace />;
  }
}

export default ProtectedRoute;
