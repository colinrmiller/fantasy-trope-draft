import React, { useState, useEffect } from "react";
//import the components we will need
import { EmployeeCard } from "./EmployeeCard";
import {
    getAllEmployees,
    getEmployeeById,
    deleteEmployee,
} from "../../modules/EmployeeManager";
import { useHistory } from "react-router";

export const EmployeeList = () => {
    // The initial state is an empty array
    const [employees, setEmployees] = useState([]);

    const history = useHistory();

    const getEmployees = () => {
        // After the data comes back from the API, we
        //  use the setEmployees function to update state
        return getAllEmployees().then((employeesFromAPI) => {
            setEmployees(employeesFromAPI);
        });
    };

    const handleDeleteEmployee = (id) => {
        deleteEmployee(id).then(
            () => getEmployees() //.then(setCustomers));
        );
    };

    // got the Employees from the API on the component's first render
    useEffect(() => {
        getEmployees();
    }, []);

    // Finally we use .map() to "loop over" the Employees array to show a list of Employee cards
    return (
        <div>
            <div className="container-cards">
                {employees.map((employee) => (
                    <EmployeeCard
                        key={employee.id}
                        employee={employee}
                        handleDeleteEmployee={handleDeleteEmployee}
                    />
                ))}
            </div>
            <button
                type="button"
                className="btn"
                onClick={() => {
                    history.push("/employees/create");
                }}
            >
                Create New Employee
            </button>
        </div>
    );
};
