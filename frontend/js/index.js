
document.querySelector("login-page").style.display = "block";
document.querySelector("dashboard-page").style.display = "none";


const username = document.querySelector('#username').value;
const password = document.querySelector('#password').value;
const email = document.querySelector('#email').value;
document.getElementById("loginSubmit").addEventListener("click", login);



