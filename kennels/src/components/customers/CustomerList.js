import React, { useState, useEffect } from "react";
//import the components we will need
import { CustomerCard } from "./CustomerCard";
import {
    getCustomers,
    getCustomerById,
    deleteCustomer,
} from "../../modules/CustomerManager";
import { useHistory } from "react-router";

export const CustomerList = () => {
    // The initial state is an empty array
    const [customers, setCustomers] = useState([]);

    const history = useHistory();

    const getCustomersData = () => {
        // After the data comes back from the API, we
        //  use the setCustomers function to update state
        return getCustomers().then((customersFromAPI) => {
            setCustomers(customersFromAPI);
        });
    };

    const handleDeleteCustomer = (id) => {
        deleteCustomer(id).then(
            () => getCustomers() //.then(setCustomers));
        );
    };

    // got the Customers from the API on the component's first render
    useEffect(() => {
        getCustomersData();
    }, []);

    // Finally we use .map() to "loop over" the Customers array to show a list of Customer cards
    return (
        <div>
            <div className="container-cards">
                {customers.map((customer) => (
                    <CustomerCard
                        key={customer.id}
                        customer={customer}
                        handleDeleteCustomer={handleDeleteCustomer}
                    />
                ))}
            </div>
            <button
                type="button"
                className="btn"
                onClick={() => {
                    history.push("/customers/create");
                }}
            >
                Create New Customer
            </button>
        </div>
    );
};
