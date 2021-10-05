const remoteURL = "http://localhost:5002";

// export default  {
//     /*
//           Since the purpose of this module is to be used by
//           all of the more specialized ones, then the string
//           of `animals` should not be hard coded here.
//     */

//     get(id) {
//         return fetch(`${remoteURL}/animals/${id}`).then((e) => e.json());
//     },
//     getAll() {
//         return fetch(`${remoteURL}/animals`).then((e) => e.json());
//     },
// };

export default class APIManager {
    getById(target, id, expandLocations = false, expandCustomers = false) {
        let expandQuery = "?";
        if (expandLocations || expandCustomers) {
            expandQuery += expandLocations ? "_expand=location&" : "";
            expandQuery += expandCustomers ? "_expand=customer" : "";
        }
        let url = `${remoteURL}/${target}/${id}/${expandQuery}`;
        return fetch(`${remoteURL}/${target}/${id}/${expandQuery}`).then(
            (res) => res.json()
        );
    }

    getAll(target, expandLocations = false, expandCustomers = false) {
        let expandQuery = "?";
        if (expandLocations || expandCustomers) {
            expandQuery += expandLocations ? "_expand=location&" : "";
            expandQuery += expandCustomers ? "_expand=customer" : "";
        }

        return fetch(`${remoteURL}/${target}/${expandQuery}`).then((res) =>
            res.json()
        );
    }

    getRandomId(target) {
        return fetch(`${remoteURL}/${target}`)
            .then((result) => result.json())
            .then((objArray) => {
                const randomIndex = Math.floor(Math.random() * objArray.length);
                const randomObj = objArray[randomIndex];
                return randomObj.id;
            });
    }

    delete(target, id) {
        return fetch(`${remoteURL}/${target}/${id}`, {
            method: "DELETE",
        }).then((result) => result.json());
    }

    addEntry(target, newEntry) {
        return fetch(`${remoteURL}/${target}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEntry),
        }).then((response) => response.json());
    }

    updateEntry(target, updatedEntry) {
        return fetch(`${remoteURL}/${target}/${updatedEntry.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedEntry),
        }).then((response) => response.json());
    }
}
