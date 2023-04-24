document.querySelector("login-page").style.display = "block";
document.querySelector("home-page").style.display = "none";


const username = document.querySelector('#username').value;
const password = document.querySelector('#password').value;
const email = document.querySelector('#email').value;
document.getElementById("loginSubmit").addEventListener("click", login);



async function login(){
    const credentials = `${username}:${password}`;
    const encodedCredentials = new TextEncoder().encode(credentials);
    const base64Credentials = fromByteArray(encodedCredentials);
    const response = await fetch('http://localhost:8080/api/auth/signin', {
    method: 'POST',
    headers: {
        'Authorization': `Basic ${base64Credentials}`,
    },
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    const data = await response.json();
    console.log("data: ", data);
    return data.token;
}