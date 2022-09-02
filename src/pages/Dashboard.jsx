import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/topbar/Topbar";
import { DrawerHeader } from "../components/topbar/TopbarComponents";

export default function Home() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Topbar />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 2, backgroundColor: "#dadada" }}
        >
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
