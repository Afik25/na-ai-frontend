import axios from "../middlewares/http-common";
import moment from "moment";
import { LOGIN, REGISTER, COMPLETE, COMPLETE_ACTIVATION, LOAD_DATA } from "../routes";

export function login(data) {
  //
  const dates = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const location = "N/A";
  const latitude = "N/A";
  const longitude = "N/A";
  const device = "PC";
  const ip_address = "N/A";
  const operating_system = "N/A";
  const navigator = "N/A";
  //
  const _data = {
    username: data.username,
    password: data.password,
    dates: dates,
    location: location,
    latitude: latitude,
    longitude: longitude,
    device: device,
    ip_address: ip_address,
    operating_system: operating_system,
    navigator: navigator,
  };
  return new Promise(async (resolve, reject) => {
    await axios
      .post(LOGIN, _data, {
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
    is_completed: false,
    thumbnails: data.thumbnails,
    username: data.username,
    old_password: data.old_password,
    new_password: data.new_password,
    //
    dates: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
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
    dates: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    confirmation_code: data.confirmation_code,
    is_completed: true,
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

export function loadData(axiosPrivate) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(LOAD_DATA,{
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