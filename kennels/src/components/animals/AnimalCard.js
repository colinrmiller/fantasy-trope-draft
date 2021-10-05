import React from "react";
import "./Animal.css";
import { Link } from "react-router-dom";

import dogImg from "./dog.png";
import { useHistory } from "react-router";

// const dogImg = require("./dog.png");

export const AnimalCard = ({ animal, handleDeleteAnimal }) => {
    const history = useHistory();
    return (
        <div className="card">
            <div className="card-content">
                <picture>
                    <img src={dogImg} style={{ width: "100px" }} alt="My Dog" />
                </picture>
                <h3>
                    Name: <span className="card-petname">{animal.name}</span>
                </h3>
                <p>Breed: {animal.breed}</p>
                <p>Customer: {animal.customer?.name}</p>
                <p>Location: {animal.location?.name}</p>
                <Link to={`/animals/${animal.id}`}>
                    <button>Details</button>
                </Link>
                <button
                    type="button"
                    onClick={() => history.push(`/animals/${animal.id}/edit`)}
                >
                    Edit
                </button>

                <button
                    type="button"
                    onClick={() => handleDeleteAnimal(animal.id)}
                >
                    Discharge
                </button>
            </div>
        </div>
    );
};
