import { useEffect, useState } from "react";

export const handleAccessToken = (currentUser) => {
  if (currentUser.photoUrl !== "") {
    return currentUser.accessToken;
  } else {
    return currentUser["stsTokenManager"]["accessToken"];
  }
};

export const handleString = (res) => {
  let resp = res.split("/")[1];
  resp = resp.replace(/-/g, " ");
  const arr = resp.split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const result = arr.join(" ");
  return result;
};

export const useNetwork = () => {
  const [isOnline, setNetwork] = useState(window.navigator.onLine);
  const updateNetwork = () => {
    setNetwork(window.navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("offline", updateNetwork);
    window.addEventListener("online", updateNetwork);
    return () => {
      window.removeEventListener("offline", updateNetwork);
      window.removeEventListener("online", updateNetwork);
    };
  });
  return isOnline;
};

export const randomId = (lenStr) => {
  let random = "";
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < lenStr; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return random;
};

export const getCountData = (patients, array2, keys) => {
  let newArr = [];
  if (patients.length !== 0) {
    array2.map((arr) => {
      let count = 0;
      let data = {};
      patients.map((patient) => {
        if (patient[keys] === arr) {
          count++;
        }
      });
      data[keys] = count;
      data["name"] = arr;
      newArr.push(data);
    });
  }
  return newArr;
};

export const getCountDate = (patients) => {
  let arr = [];
  if (patients.length !== 0) {
    let dateArr = [];
    patients.sort((a, b) => {
      const date1 = new Date(a.created_at);
      const date2 = new Date(b.created_at);
      return date1 - date2;
    });
    patients.map((patient) => {
      let date = patient.created_at.split(",")[0];
      dateArr.push(date);
    });

    if (dateArr.length !== 0) {
      dateArr.forEach((date) => {
        let data = { name: date, date: 1 };
        const index = arr.findIndex((find) => {
          return find.name === date;
        });
        index === -1 ? arr.push(data) : (arr[index].date += 1);
      });
    }
  }
  return arr;
};

export const getVerifiedPatients = (patients) => {
  let arr = [];
  if (patients.length !== 0) {
    patients.map((patient) => {
      let data = { is_verified: patient.is_verified, value: 1 };
      const index = arr.findIndex((find) => {
        return find.is_verified === patient.is_verified;
      });
      index === -1 ? arr.push(data) : (arr[index].value += 1);
    });
  }
  return arr;
};
