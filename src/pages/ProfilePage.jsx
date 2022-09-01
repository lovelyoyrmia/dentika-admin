import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarProfile from "../components/sidebar/SidebarProfile";

export default function ProfilePage() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SidebarProfile />
        <Outlet />
      </Box>
    </>
  );
}
