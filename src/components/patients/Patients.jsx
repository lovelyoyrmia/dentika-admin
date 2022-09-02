import React, { useEffect, useState, useRef, useCallback } from "react";
import { adminAxios } from "../../services/axios";
import { useAuth } from "../../services/FirebaseAuthContext";
import { ROLE } from "../../constant/role";
import {
  Box,
  Alert,
  Button,
  CircularProgress,
  DialogContent,
  Dialog,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useDownloadExcel } from "react-export-table-to-excel";
import TablePatients from "./TablePatients";
import {
  BLOOD,
  GENDER,
  MARITAL_STATUS,
  newKeys,
} from "../../constant/constants";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";
import PatientForm from "./PatientForm";
import PatientList from "./PatientList";
import {
  getCountData,
  getCountDate,
  getVerifiedPatients,
} from "../../utils/utils";
import PatientCharts from "./PatientCharts";
import PatientsPagination from "./PatientsPagination";

export default function Patients() {
  const { currentUser } = useAuth();
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const getAllPatients = useCallback(() => {
    const req = {
      email: currentUser.email,
      role: {
        ADMIN: ROLE.admin,
      },
    };
    setLoading(true);
    adminAxios
      .post("/getAllUsers", req)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data["data"];
          data.sort((a, b) => {
            const date1 = new Date(a.created_at);
            const date2 = new Date(b.created_at);
            return date2 - date1;
          });
          setPatients(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, [currentUser.email]);

  useEffect(() => {
    let interval = setTimeout(getAllPatients, 100);

    return () => {
      clearTimeout(interval);
    };
  }, [getAllPatients]);

  const getColumns = (patients) => {
    let columns = [];
    if (patients.length !== 0) {
      for (const key of newKeys) {
        let data = {};
        data["id"] = key;
        data["label"] = key.replace(/_/g, " ").toUpperCase();
        data["minWidth"] = 170;
        columns.push(data);
      }
    }
    return columns;
  };

  const updateVerifiedPatient = (id) => {
    const req = {
      email: currentUser.email,
      role: {
        ADMIN: ROLE.admin,
      },
    };
    setLoading(true);
    adminAxios
      .put("/updateUser/" + id, req)
      .then((res) => {
        if (res.status === 200) {
          getAllPatients();
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };

  const deleteUnverified = (id) => {
    const req = {
      email: currentUser.email,
      role: {
        ADMIN: ROLE.admin,
      },
    };
    setLoading(true);
    adminAxios
      .post("/deleteUser/" + id, req)
      .then((res) => {
        if (res.status === 200) {
          getAllPatients();
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };

  const tableRef = useRef();
  const dataVerified = getVerifiedPatients(patients);
  const columns = getColumns(patients);
  const dataGender = getCountData(patients, GENDER, "gender");
  const dataBlood = getCountData(patients, BLOOD, "blood");
  const dataDate = getCountDate(patients);
  const dataMaritalStatus = getCountData(
    patients,
    MARITAL_STATUS,
    "marital_status"
  );
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients =
    patients.length !== 0 && !error
      ? patients.filter((patient) => {
          return patient.is_verified === false;
        }).length !== 0
        ? patients
            .filter((patient) => {
              return patient.is_verified === false;
            })
            .slice(indexOfFirstPatient, indexOfLastPatient)
        : patients
            .filter((patient) => {
              return patient.is_verified === true;
            })
            .slice(indexOfFirstPatient, indexOfLastPatient)
      : patients.length;
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const { exportToExcel } = useDownloadExcel({
    currentTableRef: tableRef.current,
    sheet: "patients",
    filename: "table",
  });

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{ width: 1 / 2, backgroundColor: "white", p: 2, borderRadius: 3 }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <Box>
              <Box component="h2" sx={{ mb: 1 }}>
                Patients
              </Box>
              <Box sx={{ color: "gray" }}>
                {patients.length !== 0 ? patients.length : "No"}{" "}
                {patients.length > 1
                  ? "registered patients"
                  : "registered patient"}
                {dataVerified.filter((patient) => patient.is_verified === false)
                  .length !== 0
                  ? ", " +
                    dataVerified.filter(
                      (patient) => patient.is_verified === false
                    )[0].value +
                    " unverified patients"
                  : ", no unverified patients"}
              </Box>
            </Box>
            <Box>
              <IconButton onClick={getAllPatients}>
                <ReplayIcon />
              </IconButton>
              <Button
                variant="contained"
                startIcon={<PersonAddAltIcon />}
                onClick={() => {
                  setOpen(true);
                }}
                sx={{ ml: 2 }}
              >
                Add Patient
              </Button>
            </Box>
          </Box>
          <Box
            elevation={3}
            sx={{
              alignItems: "center",
              mt: 3,
              p: 1,
              textAlign: "center",
            }}
          >
            {!loading ? (
              currentPatients !== 0 && !error ? (
                <Box>
                  <PatientList
                    patients={currentPatients}
                    updateVerified={updateVerifiedPatient}
                    deleteUnverified={deleteUnverified}
                  />
                  <Box
                    sx={{ mt: 3, display: "flex", justifyContent: "center" }}
                  >
                    <PatientsPagination
                      patientsPerPage={patientsPerPage}
                      totalPatients={
                        patients.filter((patient) => {
                          return patient.is_verified === false;
                        }).length !== 0
                          ? patients.filter((patient) => {
                              return patient.is_verified === false;
                            }).length
                          : patients.filter((patient) => {
                              return patient.is_verified === true;
                            }).length
                      }
                      page={currentPage}
                      handleChangePage={handleChangePage}
                    />
                    {/* <Paper elevation={5} sx={{ p: 2 }}>
                      <Box component="h4">
                        {patients.length} Registered Patients
                      </Box>
                      <Box component="h4">
                        {patients.filter((patient) => {
                          return patient.is_verified === false;
                        }).length !== 0
                          ? patients.filter((patient) => {
                              return patient.is_verified === false;
                            }).length + " Unverified"
                          : "No Unverified"}{" "}
                        Patients
                      </Box>
                      <Box component="h4">
                        {patients.filter((patient) => {
                          return patient.is_verified === true;
                        }).length !== 0
                          ? patients.filter((patient) => {
                              return patient.is_verified === true;
                            }).length + " Verified"
                          : "No Verified"}{" "}
                        Patients
                      </Box>
                    </Paper> */}
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Alert severity="info">No data</Alert>
                </Box>
              )
            ) : (
              <CircularProgress />
            )}
          </Box>
          {/* TABLE */}
        </Box>
        <Box
          sx={{
            width: 1 / 2,
            p: 2,
            backgroundColor: "white",
            ml: 2,
            textAlign: "center",
            borderRadius: 3,
          }}
        >
          {!loading ? (
            patients.length !== 0 && !error ? (
              <PatientCharts
                dataBlood={dataBlood}
                dataGender={dataGender}
                dataDate={dataDate}
                dataMaritalStatus={dataMaritalStatus}
              />
            ) : (
              <Box
                sx={{
                  height: "20vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Alert severity="info">No data</Alert>
              </Box>
            )
          ) : (
            <Box
              sx={{
                height: "20vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 2, backgroundColor: "white", p: 2, borderRadius: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box component="h2" sx={{ mb: 1 }}>
            Table of Patients
          </Box>

          <Button variant="contained" disabled={error} onClick={exportToExcel}>
            Export Data
          </Button>
        </Box>

        <Box
          elevation={3}
          sx={{
            alignItems: "center",
            textAlign: "center",
            mt: 2,
          }}
        >
          {!loading ? (
            patients.length !== 0 && !error ? (
              <TablePatients
                tableRef={tableRef}
                columns={columns}
                patients={patients.filter((patient) => {
                  return patient.is_verified === true;
                })}
                loading={loading}
                error={error}
              />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Alert severity="info">No data</Alert>
              </Box>
            )
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Box>
      <Dialog
        maxWidth="lg"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => {
              setOpen(false);
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <PatientForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
