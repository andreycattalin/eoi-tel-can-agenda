const firstName = document.getElementById("firstName")
const email = document.getElementById("email")
const phone = document.getElementById("phone")

const loader = document.getElementById("loader")

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
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apiKey": API_KEY,
            "Authorization": `Bearer ${token}`
        },
        body: bodyData
    };

    try {
        const response = await fetch(endpoints.contacts, requestOptions)

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        if (response.status != 201) {
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