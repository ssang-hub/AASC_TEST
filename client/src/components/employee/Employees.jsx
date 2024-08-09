import React, { useState } from "react";
import EmployeeInfo from "./EmployeeInfo";
import useFetchApi from "../../hooks/useFetchApi";
import "./style.scss";
function Employees() {
  const {
    data: employees,
    loading: isLoading,
    refetchApi,
  } = useFetchApi({ url: process.env.REACT_APP_BITRIX24_URL });
  const [highlightedEmployee, setHighlightedEmployee] = useState(null);

  const onHighlightEmployee = (id) => {
    setHighlightedEmployee(employees.find((employee) => employee.ID === id));
  };

  return (
    <div className="container mt-4">
      <div className="my-3">
        <button
          className="btn btn-outline-success mx-3"
          onClick={() => refetchApi()}
        >
          Refresh
        </button>
        <button
          className="btn btn-outline-success"
          data-toggle="modal"
          data-target="#EmployeeModal"
          disabled={!highlightedEmployee}
        >
          View employee
        </button>
      </div>
      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th>Employee Names</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <div className="spinner-border text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            employees.map((employee) => (
              <tr key={employee.ID}>
                <td>
                  <div className="d-flex align-items-center">
                    <div
                      className={`ms-3 employee-item p-2 rounded ${
                        highlightedEmployee &&
                        highlightedEmployee.ID === employee.ID
                          ? "employee-hightlighted"
                          : ""
                      }`}
                      onClick={() => onHighlightEmployee(employee.ID)}
                    >
                      <p className="fw-bold mb-1">
                        {employee.LAST_NAME} {employee.NAME}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {highlightedEmployee && (
        <EmployeeInfo highlightedEmployee={highlightedEmployee} />
      )}
    </div>
  );
}

export default Employees;
