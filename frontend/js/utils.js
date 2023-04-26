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
    e.preventDefault();
    fetch("/login", {
        method: "POST",
        body: JSON.stringify(formData),
        mode: "cors",
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Username, password or email is incorrect");
        }
    }).then(user => {
        sessStorage = JSON.parse(sessionStorage.getItem("user"))
        e.preventDefault();
        connectWebsocket(user);
        
        gotoHomepage();
        const userJson = JSON.stringify(user);
        sessionStorage.setItem("user", userJson);
        document.cookie = `User=${userJson}; expires=${new Date(Date.now() + 86400000).toUTCString()}`;
        localStorage.setItem("username", user.username);
        // sleep 100ms
        
        // load profile
        loadProfile();

        LoadChatArea(); 
        // let outgoingEvent = new LoggedInUsersEvent();
        // sendEvent("online_users", outgoingEvent);
        
        const observer = new MutationObserver(() => {
            const element = document.getElementById(`chatroom-message${sessStorage.username}`);
            if (element) {
              element.addEventListener("submit", sendMessage);
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        
    }) .catch((err) => {
        console.log(err.message);
        return false;
    })
}


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