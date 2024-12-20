const contactList = document.getElementById("contactList")

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
    try {
        const response = await fetch(reqURL, requestOptions)

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        console.log(data)
        printContacts(data)
    } catch (error) {
        console.error(error);
    }
}

function printContacts(contacts) {

    let html = ""
    contacts.forEach(contact => {
        html += `<div class="w-full shadow-md shadow-slate-200 bg-slate-50 rounded-lg px-4 py-2">
                <h4 class="font-bold">${contact.name}</h4>
                <div class="mt-1">
                    <p class="text-sm bg-blue-500 text-white w-fit px-2 py-0.5 rounded-lg">${contact.email}</p>
                    <p class="text-sm mt-2 border-t pt-2 border-dashed">${contact.phone}</p>
                </div>
            </div>`
    });

    contactList.innerHTML = html

}


getContacts()