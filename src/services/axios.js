import axios from "axios";

export const adminAxios = axios.create({
  baseURL: "http://localhost:5000/api/admin",
});

export const patientAxios = axios.create({
  baseURL: "http://localhost:5000/api/patient",
});

export const bookingAxios = axios.create({
  baseURL: "http://localhost:5000/api/appointment",
});

export const setAuthToken = (axios, token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
