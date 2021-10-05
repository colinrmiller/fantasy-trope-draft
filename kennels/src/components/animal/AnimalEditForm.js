import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import AnimalManager from "../../modules/AnimalManager";
import { getAnimalById, updateAnimal } from "../../modules/AnimalManager";

export const AnimalEditForm = (props) => {
    const [animal, setAnimal] = useState({
        name: "",
        breed: "",
        locationId: null,
        customerId: null,
    });
    const [isLoading, setIsLoading] = useState(false);

    const { animalId } = useParams();
    const history = useHistory();

    const handleFieldChange = (evt) => {
        const stateToChange = { ...animal };
        stateToChange[evt.target.id] = evt.target.value;
        setAnimal(stateToChange);
    };

    const updateExistingAnimal = (evt) => {
        evt.preventDefault();
        setIsLoading(true);

        // This is an edit, so we need the id
        const editedAnimal = {
            id: animalId,
            name: animal.name,
            breed: animal.breed,
            locationId: animal.locationId,
            customerId: animal.customerId,
        };

        updateAnimal(editedAnimal).then(() => history.push("/animals"));
    };

    useEffect(() => {
        getAnimalById(animalId).then((animal) => {
            setAnimal(animal);
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            <form>
                <fieldset>
                    <div className="formgrid">
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="name"
                            value={animal.name}
                        />
                        <label htmlFor="name">Animal name</label>

                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="breed"
                            value={animal.breed}
                        />
                        <label htmlFor="breed">Breed</label>
                    </div>
                    <div className="alignRight">
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={updateExistingAnimal}
                            className="btn btn-primary"
                        >
                            Submit
                        </button>
                    </div>
                </fieldset>
            </form>
        </>
    );
};
