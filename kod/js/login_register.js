let userPrefix = "https://teaching.maumt.se/apis/access/";

document.querySelector("#registerButton").addEventListener("click", registerUser);

function registerUser() {
    let username = document.querySelector("input#username").value;
    console.log(username);
    let password = document.querySelector("input#password").value;
    console.log(password);

    let postRequest = new Request(userPrefix, {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
            action: "register",
            user_name: username,
            password: password
        })
    });

    getResource(postRequest);
}