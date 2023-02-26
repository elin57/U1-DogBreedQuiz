"use strict";

document.querySelector("#mainContent > button:nth-of-type(1)").addEventListener("click", defineRequest);

function defineRequest() {
    if(document.querySelector("#firstContainer").classList.contains("registerPage")) {
        prepareRequest("register");
    } else if(document.querySelector("#firstContainer").classList.contains("loginPage")) {
        prepareRequest("login");
    }
    
}

async function prepareRequest(postOrGet) {

    let userPrefix = "https://teaching.maumt.se/apis/access/";
    
    prepareStatusPopup();

    if(postOrGet === "register") {
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
        startFetch(postRequest);
    
    } else if(postOrGet === "login") {
        let username = document.querySelector("input#username").value;
        let password = document.querySelector("input#password").value;
        console.log(username);
        console.log(password);

        let getRequest = new Request(`${userPrefix}?action=check_credentials&user_name=${username}&password=${password}`);

        startFetch(getRequest);

        localStorage.removeItem("username");
        window.localStorage.setItem("username", `${username}`);    
    }


    return;
}



function statusUpdate(status) {
    let popup = document.querySelector("#showStatus");

    if(document.querySelector("#firstContainer").classList.contains("registerPage")) {
        if(status === 418) {
            popup.innerHTML = `
            <div id=contentContainer>
            <p>The server thinks it's not a teapot!</p>
            <button id='closePopup'>CLOSE</button>
            </div>
            `;
        } else if(status === 409) {
            popup.innerHTML = `
            <div id=contentContainer>
            <p>Sorry, that name is taken. Please try with another one.</p>
            <button id='closePopup'>CLOSE</button>
            </div>
            `;
        } else if(status === 400) {
            popup.innerHTML = `
            <div id=contentContainer>
            <p>One or both of the slots weren't filled in.</p>
            <button id='closePopup'>CLOSE</button>
            </div>
            `;
        } else {
            popup.innerHTML = `
            <div id=contentContainer>
            <p>Registration Complete.<br>Please proceed to login.</p>
            <button id='closePopup'>CLOSE</button>
            </div>
            `;
        }
        document.querySelector("#closePopup").addEventListener("click", closePopup);

    } else if(document.querySelector("#firstContainer").classList.contains("loginPage")) {
        document.querySelector("#showStatus").style.visibility = "collapse";

        if(status === 404) {
            document.querySelector("#mainContent > p").textContent = "Wrong user name or password.";
            document.querySelector("#mainContent > p").style.backgroundColor = "white";
        } else if(status === 400) {
            document.querySelector("#mainContent > p").textContent = "One or both of the slots weren't filled in.";
            document.querySelector("#mainContent > p").style.backgroundColor = "white";
        } else if(status === 418) {
            document.querySelector("#showStatus").style.visibility = "visible";
            popup.innerHTML = `
            <div id=contentContainer>
            <p>The server thinks it's not a teapot!</p>
            <button id='closePopup'>CLOSE</button>
            </div>
            `;
            document.querySelector("#closePopup").addEventListener("click", closePopup);
        } else if(status === 200) {
            prepareQuiz();
        }
    }

    function closePopup() {
        document.querySelector("#showStatus").style.visibility = "collapse";
    }

    return;
}

document.querySelector("#mainContent > div:last-child > span").addEventListener("click", switchPage);

function switchPage(event) {

    if(document.querySelector("#firstContainer").classList.contains("registerPage")) {

        document.querySelector("#firstContainer").classList.remove("registerPage");
        document.querySelector("#firstContainer").classList.add("loginPage");

        document.querySelector("#firstContainer").style.backgroundColor = "rgb(94, 225, 181)";
    
        document.querySelector("h1:nth-of-type(1)").textContent = "LOGIN";
        document.querySelector("p:nth-of-type(1)").textContent = "Let the magic start!";
        document.querySelector("#mainContent > p").style.backgroundColor = "rgb(94, 225, 181)";

        document.querySelector("#mainContent > button:nth-of-type(1)").textContent = "Login";
        document.querySelector("#mainContent > div:last-child > span").textContent = "New to this? Register for free";

        if(event !== undefined) {
            document.querySelector("#firstContainer").style.animationName = "registerToLogin";
            document.querySelector("#firstContainer").style.animationDuration = "1s";

            document.querySelector("#mainContent > p").style.animationName = "registerToLogin";
            document.querySelector("#mainContent > p").style.animationDuration = "1s";
        }

    } else {
        document.querySelector("#firstContainer").classList.remove("loginPage");
        document.querySelector("#firstContainer").classList.add("registerPage");

        document.querySelector("#firstContainer").style.backgroundColor = "rgb(7, 130, 73)";

        document.querySelector("h1:nth-of-type(1)").textContent = "REGISTER";
        document.querySelector("p:nth-of-type(1)").textContent = "Ready when you are...";
        document.querySelector("#mainContent > p").style.backgroundColor = "rgb(7, 130, 73)";

        document.querySelector("#mainContent > button:nth-of-type(1)").textContent = "Register";
        document.querySelector("#mainContent > div:last-child > span").textContent = "Already have an account? Go to login";

        if(event !== undefined) {
            document.querySelector("#firstContainer").style.animationName = "loginToRegister";
            document.querySelector("#firstContainer").style.animationDuration = "1s";

            document.querySelector("#mainContent > p").style.animationName = "loginToRegister";
            document.querySelector("#mainContent > p").style.animationDuration = "1s";
        }
    }
}
