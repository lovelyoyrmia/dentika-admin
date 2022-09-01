import React from "react";
import { Box, Paper } from "@mui/material";
import BarCharts from "../charts/BarChart";
import PieCharts from "../charts/PieChart";

export default function PatientCharts({
  dataBlood,
  dataGender,
  dataDate,
  dataMaritalStatus,
}) {
  return (
    <Box
      sx={{
        p: 2,

        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Paper
          elevation={5}
          sx={{
            p: 2,
            height: "400px",
            width: 1 / 2.1,
          }}
        >
          <Box component="h4">Blood</Box>
          <PieCharts data={dataBlood} keys="blood" />
        </Paper>
        <Paper
          elevation={5}
          sx={{
            p: 2,
            height: "400px",
            width: 1 / 2.1,
          }}
        >
          <Box component="h4">Gender</Box>
          <PieCharts data={dataGender} keys="gender" />
        </Paper>
      </Box>

      <Box sx={{ display: "flex", mt: 2 }}>
        <Paper
          elevation={5}
          sx={{
            p: 2,
            height: "300px",
            width: "100%",
          }}
        >
          <Box component="h4">Registered Date</Box>
          <BarCharts data={dataDate} keys="date" />
        </Paper>
      </Box>

      <Box sx={{ display: "flex", mt: 2 }}>
        <Paper
          elevation={5}
          sx={{
            p: 2,
            height: "300px",
            width: "100%",
          }}
        >
          <Box component="h4">Status</Box>
          <BarCharts data={dataMaritalStatus} keys="marital_status" />
        </Paper>
      </Box>
    </Box>
  );
}
