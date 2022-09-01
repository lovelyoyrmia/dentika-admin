import React, { useState } from "react";
import {
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Badge,
  CssBaseline,
  Avatar,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useTheme } from "@mui/material/styles";
import { DrawerHeader, AppBar, Drawer } from "./TopbarComponents";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LOGO from "../../images/logo.jpg";
import { ListSidebar } from "../../constant/constants";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <img src={LOGO} alt="logo" width={100} />
          <Box
            sx={{
              display: "flex",
              width: 100,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton>
              <Badge badgeContent={3} color="primary" max={99}>
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
            <Avatar src="" alt="" />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {ListSidebar.map((side) => (
            <ListItem key={side.id} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  navigate(side.path);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {side.icon}
                </ListItemIcon>
                <ListItemText
                  primary={side.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
