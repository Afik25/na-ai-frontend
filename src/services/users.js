import axios from "../middlewares/http-common";
import { REGISTER, COMPLETE, COMPLETE_ACTIVATION, USERS } from "../routes";

export function inscription(data) {
  const _data = {
    prename: data.prename,
    name: data.name,
    username: data.username,
    password: data.password,
    is_completed: false,
    sys_role: "user",
  };
  return new Promise(async (resolve, reject) => {
    await axios
      .post(REGISTER, _data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function completeInscription(axiosPrivate, data) {
  const _data = {
    id: data.id,
    prename: data.prename,
    name: data.name,
    gender: data.gender,
    telephone: data.telephone,
    mail: data?.mail || "",
    birth: data.birth,
    birth_location: data.birth_location,
    is_completed: data.is_completed,
    thumbnails: data.thumbnails,
    username: data.username,
    old_password: data.old_password,
    new_password: data.new_password,
    //
    dates: new Date(),
    location: "N/A",
    latitude: "N/A",
    longitude: "N/A",
    device: "PC",
    ip_address: "127.0.0.1",
    operating_system: "Linux",
    navigator: "Chrome",
  };
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post(COMPLETE, _data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function completeActivation(axiosPrivate, data) {
  const _data = {
    id: data.id,
    dates: new Date(),
    confirmation_code: data.confirmation_code,
    is_completed: data.is_completed,
  };
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post(COMPLETE_ACTIVATION, _data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// USERS
export function getUsers(axiosPrivate, signal) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(USERS, {
        signal: signal,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
