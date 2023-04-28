

document.querySelector("login-page").style.display = "block";
document.querySelector("dashboard-page").style.display = "none";

const username = document.querySelector('#username').value;
const password = document.querySelector('#password').value;

document.getElementById("loginSubmit").addEventListener("click", login);

 function login(e){
    let formData = {
        "emailUsername": document.getElementById("loginUsername").value,
        "password": document.getElementById("loginPassword").value,
    }
    if (!validLoginForm(formData)) {
        e.preventDefault();
        console.log("invalid login form");
        return false;
    };
    const credentials = `${username}:${password}`;
    const encodedCredentials = new TextEncoder().encode(credentials);
    const base64Credentials = fromByteArray(encodedCredentials);
    fetch('/signin', {
    method: 'POST',
    headers: {
        'Authorization': `Basic ${base64Credentials}`,
    },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
 
}

function validLoginForm(formData){
    const usernameErrMsg =  document.getElementById("loginUsernameErrMsg")
    const passwordErrMsg =  document.getElementById("loginPasswordErrMsg")

    let valid = {
        username: true,
        password: true,
    }
// check if username is empty
if (formData.username == ""){
    valid.username = false;
 } else {
     // check if usernameemail is valid username or email
     const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
     const usernameRegex = new RegExp(/^[åäöÅÄÖA-Za-z0-9]+$/);
     if (!(usernameRegex.test(formData.username) || emailRegex.test(formData.username))){
         usernameErrMsg.innerHTML = "Username is invalid";
         valid.username = false;
     } else {
         // else username is valid
         usernameErrMsg.classList.remove("form__input-error-message");
         usernameErrMsg.innerHTML = "";
         valid.username = true;
     }
 }

    // check if password is empty
    if (formData.password == ""){
        passwordErrMsg.classList.add("form__input-error-message");
        valid.password = false;
    } else {
        // check if password is invalid allow åäöÅÄÖ 
        const passwordLengthRegex = new RegExp(/^[åäöÅÄÖA-Za-z0-9]{5,}$/);
        if (!passwordLengthRegex.test(formData.password)){
            passwordErrMsg.innerHTML = "Password must be at least 5 characters";
            valid.password = false;
        } else {
            // else password is valid
            passwordErrMsg.classList.remove("form__input-error-message");
            passwordErrMsg.innerHTML = "";
            valid.password = true;
        }
    }
    
    // if all booleans are true, return true else return false
    if (valid.username == false || valid.password == false){
        return false;
    } else {
        return true;
    }
}