function login() {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apiKey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyaWxlb2ZkamtjbXNwdmVibnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzk1MDYsImV4cCI6MjA0OTg1NTUwNn0.MZx5Cpcw6aqM7A9Sc8_VC6HWnSKQ0SYkWpTqUAI0-Pg");

    const raw = JSON.stringify({
        "email": email,
        "password": pass
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("https://irileofdjkcmspvebnqq.supabase.co/auth/v1/token?grant_type=password", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            localStorage.setItem("user", JSON.stringify(result));

        })
        .catch((error) => console.error(error));
}