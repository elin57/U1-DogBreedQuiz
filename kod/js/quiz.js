"use strict";

function getRandomNumber(max, min = 0) {
    return min + Math.floor(max * Math.random());
}

function prepareQuiz() {
    document.querySelector("#firstContainer").classList.remove("loginPage");

    document.querySelector("#firstContainer").classList.add("quizPage");

    localStorage.setItem("loggedIn", "true");

    let username = localStorage.getItem("username");

    prepareStatusPopup();

    document.querySelector("#firstContainer").style.backgroundColor = "lightblue";
    document.querySelector("header").innerHTML = `
    <div id="top">
        <img src="media/logo.png">
        <div>Dog Breed Quiz</div>
    </div>
    <div id=toLogout>
        <p id=username>${username}</p>
        <button>logout</button>
    </div>
    `;

    document.querySelector("#toLogout > button").addEventListener("click", logOut);

    function logOut() {
        localStorage.setItem("loggedIn", "false");
        checkIfLoggedIn();
    }

    document.querySelector("#mainContent").innerHTML = `
        <img id="dogPicture" src="media/logo.png">
        <div id=optionsContainer>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    `;

    
    if(!document.querySelector("#firstContainer").classList.contains("loginPage")) {
        getPicture();
    }

    return;
}

async function getPicture() {

    let randomIndex = getRandomNumber(ALL_BREEDS.length, 0);
    let rightIndex = ALL_BREEDS[randomIndex];
    console.log(rightIndex);
    let rightOptionURL = rightIndex.url;
    
    let dogPicture = `https://dog.ceo/api/breed/${rightOptionURL}/images/random`;
    
    let resource = await startFetch(dogPicture);
    
    
    placePictureAndOptions(rightIndex, resource);
    
    return;
}

function placePictureAndOptions(rightIndex, resource) {

    let dogNames = [];
    dogNames.push(rightIndex.name);
    console.log(dogNames);


    checkIfSame();

    function checkIfSame() {
        while(dogNames.length < 4) {
            let randomIndex = getRandomNumber(ALL_BREEDS.length, 0);
            let dogName = ALL_BREEDS[randomIndex].name;
        
            if(dogNames.some(element => element === dogName)) {
                continue;
            }
            else {
                dogNames.push(dogName);
            }
        }
        
        shuffleNames();
    }

    function shuffleNames() {
        dogNames.sort(comparisonFunction);

        function comparisonFunction(element1, element2) {
            if(element1 < element2) {
                return -1;
            } else {
                return 1;
            }
        }

        console.log(dogNames);
    }

    document.querySelector("#showStatus").style.visibility = "collapse";

    let nameOptions = document.querySelectorAll("#optionsContainer > div");
    for(let i = 0; i < nameOptions.length; i++) {
        nameOptions[i].textContent = dogNames[i];
        nameOptions[i].addEventListener("click", getBothNames);
    }

    document.querySelector("#dogPicture").removeAttribute("src");
    document.querySelector("#dogPicture").setAttribute("src", `${resource.message}`);

    function getBothNames(event) {
        let nameClicked = event.currentTarget.textContent;
        let rightName = rightIndex.name;

        rightOrWrong(nameClicked, rightName);
    }

    return;
}

function rightOrWrong(nameClicked, rightName) {
    let popup = document.querySelector("#showStatus");
    document.querySelector("#showStatus").style.visibility = "visible";

    if(nameClicked === rightName) {
        popup.innerHTML = `
        <div id=contentContainer>
        <p>CORRECT!</p>
        <button id='getNewPicture'>ONE MORE</button>
        </div>
        `;

        document.querySelector("#contentContainer").style.backgroundColor = "limegreen";
    } else {
        popup.innerHTML = `
        <div id=contentContainer>
        <p>I'm afraid not... :-(</p>
        <button id='getNewPicture'>ONE MORE</button>
        </div>
        `;

        document.querySelector("#contentContainer").style.backgroundColor = "rgb(239, 110, 18)";
    }

    let height = document.querySelector("#firstContainer").scrollHeight;
    let difference = height - 666;
    popup.style.bottom = `-${difference}px`;

    document.querySelector("#getNewPicture").addEventListener("click", newPicture);
}

function newPicture() {
    document.querySelector("#showStatus").style.bottom = "0";
    document.querySelector("#dogPicture").setAttribute("src", "media/logo.png");

    prepareStatusPopup();

    getPicture();
}
