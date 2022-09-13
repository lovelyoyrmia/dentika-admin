import {
  Box,
  Grow,
  Paper,
  Avatar,
  Button,
  Popper,
  Divider,
  MenuList,
  MenuItem,
  IconButton,
  ListItemIcon,
  ClickAwayListener,
} from "@mui/material";
import moment from "moment";
import React, { useState, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constant/routes";

export default function PatientList({
  patients,
  updateVerified,
  deleteUnverified,
}) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        maxHeight: "920px",
        flexDirection: "column",
        overflow: "auto",
        textAlign: "start",
        p: 1,
      }}
    >
      {patients.map((patient) => {
        const registeredDate = moment(patient.created_at).format(
          "MMMM D, YYYY"
        );

        return (
          <Paper
            elevation={5}
            key={patient.uid}
            sx={{
              width: "100%",
              p: 2,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              mb: 2,
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar src={patient.image_url} alt="Photo" />
              <Box
                sx={{
                  ml: 3,
                  width: "250px",
                  cursor: "default",
                }}
                component="div"
                onClick={() =>
                  navigate(`${ROUTES.DASHBOARD}/patient/${patient.uid}`)
                }
              >
                <Box component="h5">{patient.name}</Box>
                <Box
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "gray",
                  }}
                >
                  {patient.email}
                </Box>
                <Box
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "gray",
                  }}
                >
                  Registered : {registeredDate}
                </Box>
                <Box sx={{ color: "gray" }}>{patient.phone_number}</Box>
              </Box>
            </Box>

            {!patient.is_verified ? (
              <Box>
                <Button
                  variant="outlined"
                  sx={{ borderColor: "success.light", color: "success.light" }}
                  onClick={() => {
                    updateVerified(patient.uid);
                  }}
                >
                  Verify
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "error.light",
                    color: "error.light",
                    ml: 2,
                  }}
                  onClick={() => {
                    deleteUnverified(patient.uid);
                  }}
                >
                  Delete
                </Button>
              </Box>
            ) : (
              <Box>
                <Button disabled endIcon={<CheckIcon />} sx={{ mr: 1 }}>
                  Verified
                </Button>
                <IconButton
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? "composition-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <MoreVertIcon />
                </IconButton>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  // role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem
                              onClick={() =>
                                navigate(
                                  `${ROUTES.DASHBOARD}/patient/${patient.uid}`
                                )
                              }
                            >
                              <ListItemIcon>
                                <PersonOutlineIcon fontSize="small" />
                              </ListItemIcon>
                              Show Profile
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                              <ListItemIcon>
                                <EditIcon fontSize="small" />
                              </ListItemIcon>
                              Edit
                            </MenuItem>
                            <Divider />
                            <MenuItem
                              sx={{ color: "error.light" }}
                              onClick={() => {
                                deleteUnverified(patient.uid);
                              }}
                            >
                              <ListItemIcon>
                                <DeleteIcon
                                  fontSize="small"
                                  sx={{ color: "error.light" }}
                                />
                              </ListItemIcon>
                              Delete
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Box>
            )}
          </Paper>
        );
      })}
    </Box>
  );
}
