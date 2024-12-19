const email = document.getElementById("email")
const pass = document.getElementById("pass")
const loader = document.getElementById("loader")
setLoading(false)

async function login() {
    setLoading(true)

    const bodyData = JSON.stringify({
        "email": email.value,
        "password": pass.value
    });

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apiKey": API_KEY
        },
        body: bodyData
    };

    try {
        const response = await fetch(endpoints.login, requestOptions)

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        if (data.access_token) {
            localStorage.setItem(STORAGE_USER, JSON.stringify(data.user));
        }

        console.log("User logged in successfully");

        setLoading(false)
        // Redirect to app

        window.location.href = "/agenda.html"

    } catch (error) {
        setLoading(false)
        console.error(error);
    }
}

async function register() {
    setLoading(true)

    const bodyData = JSON.stringify({
        "email": email.value,
        "password": pass.value
    });

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apiKey": API_KEY
        },
        body: bodyData
    };

    try {
        const response = await fetch(endpoints.register, requestOptions)

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        if (data.access_token) {
            localStorage.setItem(STORAGE_USER, JSON.stringify(data.user));
        }

        console.log("User logged in successfully");

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