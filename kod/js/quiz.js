"use strict";

function get_random_number (max, min = 0) {
    // Returns a random number between min (inclusive) and max (exclusive)
    return min + Math.floor(max * Math.random());
}

function prepareQuiz() {
    document.querySelector("#firstContainer").classList.remove("loginPage");
    //Kommer ha endless loop om jag inte tar bort denna classen.

    document.querySelector("#firstContainer").style.backgroundColor = "lightblue";
    document.querySelector("header").innerHTML = `
    <div id="top">
        <img src="media/logo.png">
        <div>Dog Breed Quiz</div>
    </div>
    <div id=toLogout>
        <p id=username></p>
        <button>logout</button>
    </div>
    `;
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
        document.querySelector("#firstContainer").classList.add("quizPage");
        getPicture();
    }

    return;
}

async function getPicture() {
    let randomIndex = get_random_number(ALL_BREEDS.length, 0);
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
            let randomIndex = get_random_number(ALL_BREEDS.length, 0);
            let dogName = ALL_BREEDS[randomIndex].name;
        
            if(dogNames.some(element => element === dogName)) {
                continue;
            }
            else {
                dogNames.push(dogName);
                console.log(dogNames);
            }
        }
        
        shuffleNames();
    }

    function shuffleNames() {
        dogNames.sort(comparisonFunction);

        function comparisonFunction(element1, element2) {
            if(element1.length < element2.length) {
                return -1;
            } else {
                return 1;
            }
        }

        console.log(dogNames);
    }


    let nameOptions = document.querySelectorAll("#optionsContainer > div");
    for(let i = 0; i < nameOptions.length; i++) {
        nameOptions[i].textContent = dogNames[i];
        nameOptions[i].addEventListener("click", rightOrWrong);
    }
        
    

    document.querySelector("#dogPicture").removeAttribute("src");
    document.querySelector("#dogPicture").setAttribute("src", `${resource.message}`);

    return rightIndex;
}

function rightOrWrong(event) {

}
