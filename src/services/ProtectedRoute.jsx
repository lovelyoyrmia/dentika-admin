import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../constant/routes";
import { useAuth } from "./FirebaseAuthContext";

export default function ProtectedRoute() {
  const { currentUser } = useAuth();

  return currentUser != null ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
}
