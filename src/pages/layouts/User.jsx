import React from "react";
import {MdOutlineArrowBackIos,MdOutlineArrowForwardIos,FaLockOpen,FaLock} from "../../middlewares/icons"

const User = () => {
  return (
    <div className="users">
      <div className="head">
        <h2 className="title t-1">Inscribed users</h2>
        <p className="title t-3">
          All inscribed users from here.
        </p>
      </div>
      <div className="body">
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Date inscription</th>
                <th>Username</th>
                <th>Names</th>
                <th>Gender</th>
                <th>Telephone</th>
                <th>Mail</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="tbody-col-1">
                  Mon 16 Oct 12:46 AM
                  {/* <p className="title t-3">
                    {`Uploaded on ${moment(doc.updatedAt).format(
                      "ll"
                    )} at ${moment(doc.updatedAt).format("LT")}`}
                  </p> */}
                </td>
                <td className="tbody-col-2">afik</td>
                <td className="tbody-col-3">Amisi Fikirini</td>
                <td className="tbody-col-4">Male</td>
                <td className="tbody-col-5">+243 8161 94 942</td>
                <td className="tbody-col-6">amisifikirini@gmail.com</td>
                <td className="tbody-col-6">
                  <button className="btn btn-remove">
                    <FaLockOpen />
                    <span>lock</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pagination display-flex justify-content-space-between align-items-center">
          <span>1-5 of 45</span>
          <div className="display-flex align-items-center">
            <div className="display-flex align-items-center">
              <span>Rows per page :</span>
              <select>
                <option>5</option>
                <option>10</option>
              </select>
            </div>
            <div className="display-flex align-items-center">
              <button className="button">
                <MdOutlineArrowBackIos className="icon" />
              </button>
              <button className="button">
                <MdOutlineArrowForwardIos className="icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
