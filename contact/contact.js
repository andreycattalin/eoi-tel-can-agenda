const firstName = document.getElementById("firstName")
const email = document.getElementById("email")
const phone = document.getElementById("phone")

const loader = document.getElementById("loader")
const title = document.getElementById("title")
const btnSave = document.getElementById("add-button")

// 1. Identificar si se está editando un contacto
const urlParams = new URLSearchParams(window.location.search);
const editMode = urlParams.get('edit');
console.log(editMode)
if (editMode) {
    title.innerHTML = "Editar contacto"
    btnSave.innerHTML = "Actualizar"


    // 2. Si esta en modo edicion. Cargar los datos del contacto y pintarlos en los inputs
    getContactById(editMode)


    // 3. Guardar los datos del contacto

}


// TODO: add validation

async function addContact() {
    const token = getToken()
    const userId = getUserId()

    if (email.value == "") {
        return alert("El correo electrónico es obligatorio")
    }

    setLoading(true)

    const bodyData = JSON.stringify({
        "email": email.value,
        "name": firstName.value,
        "phone": phone.value,
        "user_id": userId
    });

    const requestOptions = {
        method: editMode ? "PATCH" : "POST",
        headers: {
            "Content-Type": "application/json",
            "apiKey": API_KEY,
            "Authorization": `Bearer ${token}`
        },
        body: bodyData
    };

    try {
        let reqURL = `${endpoints.contacts}`
        if (editMode) {
            reqURL = `${endpoints.contacts}?id=eq.${editMode}`
        }

        const response = await fetch(reqURL, requestOptions)

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        console.log(response.status)
        if (response.status != 201 && response.status != 204) {
            throw new Error("Error no contemplado");
        }

        setLoading(false)
        // Redirect to app

        window.location.href = "/agenda.html"

    } catch (error) {
        setLoading(false)
        console.error(error);
    }

}

function setLoading(isLoading) {
    loader.style.display = isLoading ? "block" : "none";
}

async function getContactById(id) {
    const token = getToken()

    const myHeaders = new Headers();
    myHeaders.append("apiKey", API_KEY);
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders
    };

    const reqURL = `${endpoints.contacts}?id=eq.${id}`
    try {
        const response = await fetch(reqURL, requestOptions)

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const contact = data[0]
        console.log(data)

        // Pintar los datos en los inputs
        firstName.value = contact.name
        email.value = contact.email
        phone.value = contact.phone
    } catch (error) {
        console.error(error);
    }
}