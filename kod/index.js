"use strict";

checkIfLoggedIn();

function checkIfLoggedIn() {
    let loggedIn = localStorage.getItem("loggedIn");
    if(loggedIn === "true") {
        document.querySelector("#firstContainer").removeAttribute("class");
        prepareQuiz();
    } else {
        document.querySelector("#firstContainer").removeAttribute("class");
        document.querySelector("#firstContainer").classList.add("registerPage");
        document.querySelector("header").innerHTML = `
        <div id="top">
            <img src="media/logo.png">
            <div>Dog Breed Quiz</div>
        </div>
        `;

        document.querySelector("#mainContent").innerHTML = `
        <h1></h1>
        <label for="username">User Name:</label>
        <input id="username">
        <label for="password">Password:</label>
        <input id="password" type="password">
        <p></p>
        <button></button>
        <div id="switchPage"><span></span></div>
        `;

        document.querySelector("#mainContent > button:nth-of-type(1)").addEventListener("click", defineRequest);
        document.querySelector("#mainContent > div:last-child > span").addEventListener("click", switchPage);

        switchPage();
    }
}

function prepareStatusPopup() {
    if(document.querySelector("#showStatus") === null) {
        let parent = document.querySelector("#firstContainer");
        let popup = document.createElement("div");
        popup.setAttribute("id", "showStatus");
        parent.appendChild(popup);
    }

    document.querySelector("#showStatus").style.visibility = "visible";

    if(document.querySelector("#firstContainer").classList.contains("quizPage")) {
        document.querySelector("#showStatus").innerHTML = `<div id=fetching>Getting a random image...</div>`;
    } else {
        document.querySelector("#showStatus").innerHTML = `<div id=fetching>Contacting Server...</div>`;
    }
}
