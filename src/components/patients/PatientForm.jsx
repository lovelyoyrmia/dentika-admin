import {
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Box,
  Alert,
  Grid,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/FirebaseAuthContext";
import { toast, ToastContainer } from "react-toastify";
import { handleAccessToken, randomId } from "../../utils/utils";
import indonesia from "indonesia-cities-regencies";
import { setAuthToken, patientAxios } from "../../services/axios";
import { ROLE } from "../../constant/role";
import { BLOOD, GENDER, MARITAL_STATUS } from "../../constant/constants";

export default function PatientForm({ patient }) {
  const { currentUser } = useAuth("");
  const [cities, setCities] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const weight = patient ? patient.weight.match(/(\d+)/)[0] : "";
  const height = patient ? patient.height.match(/(\d+)/)[0] : "";
  const birthPlace = patient ? patient.birth.split(",")[0] : "";
  const birthDate = patient ? patient.birth.split(",")[1].trim() : "";
  const phoneNumber = patient
    ? patient.phoneNumber.slice(3, patient.phoneNumber.length)
    : "";
  const [state, setState] = useState({
    name: patient ? patient.name : "",
    email: patient ? patient.email : "",
    age: patient ? patient.age : "",
    birthDate: birthDate,
    birthPlace: birthPlace,
    weight: weight,
    height: height,
    phoneNumber: phoneNumber,
    gender: patient ? patient.gender : "",
    maritalStatus: patient ? patient.maritalStatus : "",
    blood: patient ? patient.blood : "",
    address1: patient ? patient.address : "",
    address2: "",
    province: patient ? patient.province : "",
    city: patient ? patient.city : "",
  });

  // const navigate = useNavigate();

  const handleValidation = () => {
    if (
      state.name !== "" &&
      state.email !== "" &&
      state.address1 !== "" &&
      state.city !== "" &&
      state.province !== "" &&
      state.age !== "" &&
      state.birthDate !== "" &&
      state.birthPlace !== "" &&
      state.blood !== "" &&
      state.gender !== "" &&
      state.height !== null &&
      state.maritalStatus !== "" &&
      state.weight !== null &&
      state.phoneNumber !== ""
    ) {
      patient ? editData() : postData();
      setError(false);
    } else {
      setError(true);
    }
  };

  const setDefault = () => {
    setState({
      name: "",
      email: "",
      age: "",
      birthDate: "",
      birthPlace: "",
      weight: "",
      height: "",
      phoneNumber: "",
      gender: "",
      maritalStatus: "",
      blood: "",
      address1: "",
      address2: "",
      province: "",
      city: "",
    });
  };

  const randomUid = randomId(20);

  const handleChange = (prop) => (event) => {
    if (prop === "province") {
      findCity(event.target.value);
      setState({ city: "" });
    }
    setState({ ...state, [prop]: event.target.value });
    setError(false);
  };

  const editData = async () => {
    try {
      setLoading(true);
      const tel = `+62${state.phoneNumber}`;
      if (tel.match(/^(\+62|62|0)8[1-9][0-9]{6,9}$/)) {
        const data = {
          uid: patient.uid,
          name: state.name,
          email: state.email,
          age: state.age,
          birth: `${state.birthPlace}, ${state.birthDate}`,
          gender: state.gender,
          weight: `${state.weight} kg`,
          height: `${state.height} cm`,
          maritalStatus: state.maritalStatus,
          phoneNumber: tel,
          blood: state.blood,
          address: `${state.address1}.` + state.address2 || "",
          province: state.province,
          city: state.city,
          role: {
            PATIENT: ROLE.patient,
          },
        };
        const token = handleAccessToken(currentUser);
        setAuthToken(patientAxios, token);
        const res = await patientAxios.put(
          "/updateData/" + currentUser.uid,
          data
        );
        if (res.data["message"] === "Success") {
          console.log(res.data);
          // localStorage.setItem("data", JSON.stringify(res.data["data"]));
          // socket.emit("sendNotification", {
          //   senderId: res.data["data"]["uid"],
          //   result: res.data["data"],
          // });
          setDefault();
          toast.success("Edit Successfully !", {
            position: "top-right",
            autoClose: 3000,
            pauseOnHover: false,
          });
        } else {
          setLoading(false);
        }
      } else {
        toast.error("Phone number is not valid", {
          position: "top-right",
          autoClose: 5000,
          pauseOnHover: false,
        });
      }
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const postData = async () => {
    try {
      setLoading(true);
      const tel = `+62${state.phoneNumber}`;
      if (tel.match(/^(\+62|62|0)8[1-9][0-9]{6,9}$/)) {
        const data = {
          uid: randomUid,
          name: state.name,
          email: currentUser.email,
          age: state.age,
          birth: `${state.birthPlace}, ${state.birthDate}`,
          gender: state.gender,
          weight: `${state.weight} kg`,
          height: `${state.height} cm`,
          maritalStatus: state.maritalStatus,
          phoneNumber: tel,
          blood: state.blood,
          address: `${state.address1}.` + state.address2 || "",
          province: state.province,
          city: state.city,
          role: {
            PATIENT: ROLE.patient,
          },
        };
        const token = handleAccessToken(currentUser);
        setAuthToken(patientAxios, token);
        const res = await patientAxios.post("/addData", data);
        if (res.data["message"] === "Success") {
          console.log(res.data);
          setDefault();
          toast.success("Added Successfully !", {
            position: "top-right",
            autoClose: 3000,
            pauseOnHover: false,
          });
        } else {
          setLoading(false);
        }
      } else {
        toast.error("Phone number is not valid", {
          position: "top-right",
          autoClose: 5000,
          pauseOnHover: false,
        });
      }
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const indonesiaCities = indonesia.getAll();

  const findCity = (prov) => {
    const newCities = [];
    if (prov !== "") {
      for (let i = 0; i < indonesiaCities.length; i++) {
        const elm = indonesiaCities[i];
        if (elm.province === prov) {
          newCities.push(elm.name);
        }
      }
      setRegencies([...new Set(newCities)]);
    }
  };

  useEffect(() => {
    const provincesFunc = () => {
      const provinces = [];
      const cities = [];
      for (let i = 0; i < indonesiaCities.length; i++) {
        const element = indonesiaCities[i];
        provinces.push(element.province);
        cities.push(element.name);
      }
      setCities([...new Set(cities)]);
      setProvinces([...new Set(provinces)].sort());
    };
    provincesFunc();
  }, [indonesiaCities]);

  return (
    <Box
      sx={{
        border: 1,
        p: 3,
        margin: 2,
        borderRadius: 2,
      }}
    >
      <div style={{ textAlign: "center", fontSize: "25px" }}>Patient Form</div>
      <form>
        {error ? (
          <div>
            <Alert severity="error" sx={{ my: 2 }}>
              Indicates a required field
            </Alert>
          </div>
        ) : (
          <br />
        )}
        <Grid
          container
          spacing={{ md: 3, xs: 2 }}
          columns={{ xs: 2, sm: 4, md: 6 }}
        >
          {/* ======================================== */}

          <Grid item xs={2} sm={2} md>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="strech"
            >
              <TextField
                id="name"
                label="Name"
                className="appointment-item"
                required
                value={state.name}
                onChange={handleChange("name")}
                placeholder="Your Name"
                variant="outlined"
              />
              <br />
              <TextField
                id="email"
                label="Email"
                className="appointment-item"
                required
                value={state.email}
                onChange={handleChange("email")}
                placeholder="Your Email"
                variant="outlined"
              />
              <br />
              <TextField
                id="address1"
                label="Address 1"
                required
                className="appointment-item"
                value={state.address1}
                onChange={handleChange("address1")}
                placeholder="Your Address"
                variant="outlined"
              />
              <br />
              <TextField
                id="address2"
                label="Address 2"
                className="appointment-item"
                value={state.address2}
                onChange={handleChange("address2")}
                placeholder="Your Address"
                variant="outlined"
              />
              <br />
              <TextField
                id="provinces"
                label="Provinces"
                select
                className="appointment-item"
                required
                value={state.province}
                onChange={handleChange("province")}
                variant="outlined"
              >
                {provinces.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* ======================================== */}

          <Grid item xs={2} sm={2} md>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="strech"
            >
              <TextField
                id="cities"
                label="Cities"
                select
                className="appointment-item"
                required
                value={state.city}
                onChange={handleChange("city")}
                variant="outlined"
              >
                {regencies.length !== 0
                  ? regencies.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))
                  : cities.map((option) => {
                      const name = option.replace(/Administrasi/g, "");
                      return (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      );
                    })}
              </TextField>
              <br />
              <TextField
                id="phoneNumber"
                label="Phone Number"
                className="appointment-item"
                required
                value={state.phoneNumber}
                onChange={handleChange("phoneNumber")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+62</InputAdornment>
                  ),
                }}
                name="phone"
                variant="outlined"
              />
              <br />
              <TextField
                id="age"
                label="Age"
                required
                type={"number"}
                className="appointment-item"
                value={state.age}
                onChange={handleChange("age")}
                variant="outlined"
              />
              <br />

              <TextField
                id="placeOfBirth"
                label="Birthplace"
                required
                className="appointment-item"
                value={state.birthPlace}
                onChange={handleChange("birthPlace")}
                variant="outlined"
              />
              <br />
              <TextField
                id="dateOfBirth"
                helperText="Fill in your birthdate"
                required
                type={"date"}
                className="appointment-item"
                value={state.birthDate}
                onChange={handleChange("birthDate")}
                variant="outlined"
              />
            </Grid>
          </Grid>

          {/* ======================================== */}

          <Grid item xs={2} sm={2} md>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="strech"
            >
              <TextField
                id="gender"
                label="Gender"
                select
                className="appointment-item"
                required
                value={state.gender}
                onChange={handleChange("gender")}
                variant="outlined"
              >
                {GENDER.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <TextField
                id="weight"
                label="Weight"
                className="appointment-item"
                required
                type={"number"}
                value={state.weight}
                onChange={handleChange("weight")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">kg</InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <br />
              <TextField
                id="height"
                label="Height"
                className="appointment-item"
                required
                type={"number"}
                value={state.height}
                onChange={handleChange("height")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">cm</InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <br />
              <TextField
                id="maritalStatus"
                label="Status"
                select
                className="appointment-item"
                required
                value={state.maritalStatus}
                onChange={handleChange("maritalStatus")}
                variant="outlined"
              >
                {MARITAL_STATUS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <TextField
                id="blood"
                label="Blood"
                select
                className="appointment-item"
                required
                value={state.blood}
                onChange={handleChange("blood")}
                variant="outlined"
              >
                {BLOOD.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>

        <br />
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              size="large"
              onClick={handleValidation}
              sx={{ width: 1 / 2 }}
            >
              Send
            </Button>
          </div>
        )}
        <ToastContainer style={{ textAlign: "start" }} />
      </form>
    </Box>
  );
}
