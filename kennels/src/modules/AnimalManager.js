const remoteURL = "http://localhost:5002";

export const getAnimalById = (animalId) => {
    //be sure your animals have good data and related to a location and customer
    return fetch(
        `${remoteURL}/animals/${animalId}?_expand=customer&_expand=location`
        // `${remoteURL}/animals/${animalId}?_expand=location&_expand=customer`
    ).then((res) => res.json());
};

export const getAllAnimals = () => {
    return fetch(`${remoteURL}/animals?_expand=customer&_expand=location`).then(
        (res) => res.json()
    );
};

export const deleteAnimal = (id) => {
    return fetch(`${remoteURL}/animals/${id}`, {
        method: "DELETE",
    }).then((result) => result.json());
};

export const addAnimal = (newAnimal) => {
    return fetch(`${remoteURL}/animals`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newAnimal),
    }).then((response) => response.json());
};

export const updateAnimal = (updatedAnimal) => {
    return fetch(`${remoteURL}/animals/${updatedAnimal.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAnimal),
    }).then((response) => response.json());
};
export default function AnimalManager() {
    this.update = updateAnimal;
    // this.getAnimalById() = getAnimalById;
}

// Add this method to the AnimalManager
export const getRandomId = () => {
    return fetch(`${remoteURL}/animals`)
        .then((result) => result.json())
        .then((animals) => {
            const randomIndex = Math.floor(Math.random() * animals.length);
            const randomAnimal = animals[randomIndex];
            return randomAnimal.id;
        });
};
