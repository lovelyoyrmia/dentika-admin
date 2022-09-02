import { Pagination } from "@mui/material";
import React from "react";

export default function PatientsPagination({
  patientsPerPage,
  totalPatients,
  page,
  handleChangePage,
}) {
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(totalPatients / patientsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Pagination
      count={pageNumbers.length}
      page={page}
      onChange={handleChangePage}
    />
  );
}
