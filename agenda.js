async function getContacts() {
    const token = getToken()

    const myHeaders = new Headers();
    myHeaders.append("apiKey", API_KEY);
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders
    };

    const userId = getUserId()
    const reqURL = `${endpoints.contacts}?user_id=eq.${userId}`
    const response = await fetch(reqURL, requestOptions)

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    console.log(data)
}

function getToken() {
    const user = localStorage.getItem(STORAGE_USER)
    return JSON.parse(user).access_token
}

function getUserId() {
    const user = localStorage.getItem(STORAGE_USER)
    return JSON.parse(user).user.id
}


getContacts()