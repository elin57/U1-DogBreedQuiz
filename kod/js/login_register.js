"use strict";

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

    if(document.querySelector("#showStatus") === null) {
        console.log("first");
        let parent = document.querySelector("#firstContainer");
        let popup = document.createElement("div");
        popup.setAttribute("id", "showStatus");
        parent.appendChild(popup);
    }

    document.querySelector("#showStatus").style.visibility = "visible";
    document.querySelector("#showStatus").innerHTML = `<div id=fetching>Contacting Server...</div>`;
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
        } else {
            popup.innerHTML = `
            <div id=contentContainer>
            <p>Registration complete.<br>Please proceed to login.</p>
            <button id='closePopup'>CLOSE</button>
            </div>
            `;
        }
    }

    document.querySelector("#closePopup").addEventListener("click", closePopup);
    function closePopup() {
        document.querySelector("#showStatus").style.visibility = "collapse";
    }


}

