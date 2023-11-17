import {
  ORIGINS_DATA,
  TRANSLATION_DATAS
} from "../routes";


export function getOriginsData(axiosPrivate, signal) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(ORIGINS_DATA, {
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

export function translationDatas(axiosPrivate, _data) {
  console.log({"Check received data ":_data})
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post(TRANSLATION_DATAS, _data, {
        headers: { "Content-Type": "application/json",  },
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