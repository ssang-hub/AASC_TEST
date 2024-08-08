import React from "react";

function EmployeeInfo({ highlightedEmployee }) {
  console.log(highlightedEmployee);

  return (
    <div
      className="modal fade"
      id="EmployeeModal"
      tabIndex="-1"
      aria-labelledby="EmployeeModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="EmployeeModalLabel">
              Employee Infomation
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <img
              className="avatar rounded-circle border border-secondary"
              src={
                highlightedEmployee?.PERSONAL_PHOTO ||
                "./default_person_avatar.png"
              }
              alt="avatar"
            />
            <h5 className="my-2">
              {highlightedEmployee.LAST_NAME} {highlightedEmployee.NAME}
            </h5>
            <table className="table" width={100}>
              <tbody>
                <tr>
                  <td className="d-flex">Employee ID:</td>
                  <td>{highlightedEmployee.ID}</td>
                </tr>
                <tr>
                  <td className="d-flex">Email:</td>
                  <td>{highlightedEmployee.EMAIL}</td>
                </tr>
                <tr>
                  <td className="d-flex">Second name:</td>
                  <td>{highlightedEmployee.SECOND_NAME || "none"}</td>
                </tr>{" "}
                <tr>
                  <td className="d-flex">Birthday:</td>
                  <td>{highlightedEmployee.PERSONAL_BIRTHDAY || "none"}</td>
                </tr>{" "}
                <tr>
                  <td className="d-flex">Number phone:</td>
                  <td>{highlightedEmployee.PERSONAL_PHONE || "none"}</td>
                </tr>{" "}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeInfo;
