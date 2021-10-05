import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import "./AnimalDetail.css";
import { useParams, useHistory } from "react-router-dom";

export const AnimalDetail = () => {
    const [animal, setAnimal] = useState({
        name: "",
        breed: "",
        location: "",
        customer: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    const { animalId } = useParams();
    const history = useHistory();

    useEffect(() => {
        const apiManager = new APIManager();

        //getAnimalById(id) from AnimalManager and hang on to the data; put it into state
        console.log("useEffect", animalId);
        apiManager.getById("animals", animalId, true, true).then((animal) => {
            // getAnimalById(animalId).then((animal) => {
            setAnimal({
                name: animal.name,
                breed: animal.breed,
                location: animal.location.name,
                customer: animal.customer.name,
            });
            setIsLoading(false);
        });
    }, [animalId]);

    const handleDelete = () => {
        const apiManager = new APIManager();

        //invoke the delete function in AnimalManger and re-direct to the animal list.
        setIsLoading(true);
        apiManager
            .delete("animals", animalId)
            .then(() => history.push("/animals"));
        // deleteAnimal(animalId).then(() => history.push("/animals"));
    };

    return (
        <section className="animal">
            <h3 className="animal__name">{animal.name}</h3>
            <div className="animal__breed">{animal.breed}</div>
            <div className="animal__location">Location: {animal.location}</div>
            <div className="animal__owner">Customer: {animal.customer}</div>
            <button type="button" disabled={isLoading} onClick={handleDelete}>
                Discharge
            </button>
        </section>
    );
};
