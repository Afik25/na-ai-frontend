import { SIGNERS } from "../routes";

export function newAssignedSigners(axiosPrivate, _data, doc_id, annotations) {
  console.log({"check signerTab here":_data})
  const data = {
    signers: _data,
    doc_id: doc_id,
    annotations: annotations,
  };
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post(SIGNERS, data, {
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
