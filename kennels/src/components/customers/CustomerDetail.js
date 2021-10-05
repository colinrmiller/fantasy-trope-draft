import React, { useState, useEffect } from "react";
import { getCustomerById } from "../../modules/CustomerManager";
// import "./CustomerDetail.css";
import { deleteCustomer } from "../../modules/CustomerManager";
import { useParams, useHistory } from "react-router-dom";

export const CustomerDetail = () => {
    const [customer, setCustomer] = useState({
        name: "",
        address: "",
        location: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    const { customerId } = useParams();
    const history = useHistory();

    useEffect(() => {
        //getCustomerById(id) from CustomerManager and hang on to the data; put it into state
        console.log("useEffect", customerId);
        getCustomerById(customerId).then((customer) => {
            setCustomer({
                name: customer.name,
                address: customer.address,
                location: customer.location.name,
            });
            setIsLoading(false);
        });
    }, [customerId]);

    const handleDelete = () => {
        //invoke the delete function in CustomerManger and re-direct to the customer list.
        setIsLoading(true);
        deleteCustomer(customerId).then(() => history.push("/customers"));
    };

    return (
        <section className="customer">
            <h3 className="customer__name">{customer.name}</h3>
            <div className="customer__address">{customer.address}</div>
            <div className="customer__location">
                Location: {customer?.location}
            </div>
            <button type="button" disabled={isLoading} onClick={handleDelete}>
                Delete
            </button>
        </section>
    );
};
