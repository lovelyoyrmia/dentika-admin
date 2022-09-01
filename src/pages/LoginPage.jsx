import React, { useState } from "react";
import { TextField, Typography, Fab, Box, Alert } from "@mui/material";
import { useAuth } from "../services/FirebaseAuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import "./css/login.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "../constant/routes";

export default function LoginPage() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { signIn } = useAuth();

  const navigate = useNavigate();

  const handleChange = (props) => (event) => {
    setState({ ...state, [props]: event.target.value });
    setError(false);
  };

  const handleDefault = () => {
    setState({ email: "", password: "" });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (state.email !== "" && state.password !== "") {
        await signIn(state.email, state.password);
        handleDefault();
        navigate(ROUTES.DASHBOARD);
      } else {
        setError(true);
      }
    } catch (error) {
      const err = handleString(error.code);
      toast.error(err, {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        draggable: false,
      });
    }
    setLoading(false);
  };

  const handleString = (res) => {
    let resp = res.split("/")[1];
    resp = resp.replace(/-/g, " ");
    const arr = resp.split(" ");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const result = arr.join(" ");
    return result;
  };

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: { md: 1 / 2.5 },
          backgroundColor: "#fffff0",
          p: 2,
          display: "flex",
          justifyContent: "center",
          borderRadius: 5,
          boxShadow: "0 0 5px 3px #627d852e",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { md: 1 / 2 },
          }}
        >
          <Typography
            className="login-title"
            variant="h6"
            noWrap
            component="div"
          >
            <span className="logo">Dentika</span>
            <span className="logo-span"> admin</span>
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Indicates a required field
            </Alert>
          )}

          <TextField
            id="email"
            label="Email"
            variant="outlined"
            required
            value={state.email}
            onChange={handleChange("email")}
            sx={{ mb: 2 }}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type={"password"}
            value={state.password}
            required
            onChange={handleChange("password")}
            sx={{ mb: 2 }}
          />
          {loading ? (
            <div className="circular">
              <CircularProgress />
            </div>
          ) : (
            <Fab
              variant="extended"
              color="secondary"
              aria-label="add"
              onClick={handleSubmit}
            >
              Login
            </Fab>
          )}
          <ToastContainer />
        </Box>
      </Box>
    </Box>
  );
}
