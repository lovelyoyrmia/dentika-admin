import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ROLE } from "../../constant/role";
import { adminAxios } from "../../services/axios";
import { useAuth } from "../../services/FirebaseAuthContext";

export default function PatientProfile() {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUserId = useCallback(() => {
    const req = {
      email: currentUser.email,
      role: {
        ADMIN: ROLE.admin,
      },
    };
    setLoading(true);
    adminAxios
      .post("/getUser/" + id, req)
      .then((res) => {
        if (res.status === 200) {
          const response = res.data["data"];
          setPatient((user) => ({ ...user, ...response }));
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(false);
        setLoading(false);
      });
  }, [currentUser.email, id]);

  useEffect(() => {
    let interval = setTimeout(getUserId, 500);

    return () => {
      clearTimeout(interval);
    };
  }, [getUserId]);

  return <div>{!loading && patient && !error ? patient.name : ""}</div>;
}
