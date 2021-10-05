import React, { useState, useEffect } from "react";
//import the components we will need
import { LocationCard } from "./LocationCard";
import {
    deleteLocation,
    getLocations,
    getLocationById,
} from "../../modules/LocationManager";
import { useHistory } from "react-router";

export const LocationList = () => {
    // The initial state is an empty array
    const [locations, setLocations] = useState([]);

    const history = useHistory();

    const getLocationsCall = () => {
        // After the data comes back from the API, we
        //  use the setLocations function to update state
        return getLocations().then((locationsFromAPI) => {
            setLocations(locationsFromAPI);
        });
    };

    const handleDeleteLocation = (id) => {
        deleteLocation(id).then(() => {
            getLocations();
        });
    };

    // got the Locations from the API on the component's first render
    useEffect(() => {
        getLocationsCall();
    }, []);

    // Finally we use .map() to "loop over" the Locations array to show a list of Location cards
    return (
        <div>
            <div className="container-cards">
                {locations.map((location) => (
                    <LocationCard
                        key={location.id}
                        location={location}
                        handleDeleteLocation={handleDeleteLocation}
                    />
                ))}
            </div>
            <button
                type="button"
                className="btn"
                onClick={() => {
                    history.push("/locations/create");
                }}
            >
                Create New Location
            </button>
        </div>
    );
};
