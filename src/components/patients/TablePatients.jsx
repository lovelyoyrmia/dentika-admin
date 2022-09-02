import React from "react";
import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function TablePatients({
  tableRef,
  columns,
  patients,
  loading,
  error,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 2,
        p: 1,
        maxHeight: "700px",
        flexDirection: "column",
        overflow: "auto",
        alignItems: "center",
      }}
    >
      <TableContainer sx={{ maxHeight: "400px", width: "1300px" }}>
        <table ref={tableRef}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#fffff0",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => {
              const verified = patient.is_verified ? "Verified" : "No Verified";
              return (
                <TableRow hover tabIndex={-1} key={patient.uid}>
                  {columns.map((column) => {
                    let value = patient[column.id];
                    if (typeof value === "boolean") value = verified;
                    return <TableCell key={column.id}>{value}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </table>
      </TableContainer>
    </Box>
  );
}
