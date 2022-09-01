import { Box, Avatar, Paper, IconButton, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import React from "react";

export default function PatientList({
  patients,
  updateVerified,
  deleteUnverified,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        maxHeight: "700px",
        flexDirection: "column",
        overflow: "auto",
        textAlign: "start",
      }}
    >
      {patients.map((patient) => {
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
              cursor: "pointer",
            }}
            component="div"
            onClick={() => {}}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar src={patient.image_url} />
              <Box
                sx={{
                  ml: 3,
                  width: "250px",
                }}
              >
                <Box component="h5">{patient.name}</Box>
                <Box
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {patient.email}
                </Box>
                <Box
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {patient.address}
                </Box>
                <Box>{patient.phone_number}</Box>
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
              <Button disabled endIcon={<CheckIcon />}>
                Verified
              </Button>
            )}
          </Paper>
        );
      })}
    </Box>
  );
}
