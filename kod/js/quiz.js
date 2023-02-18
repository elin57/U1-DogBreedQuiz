"use strict";

function get_random_number (max, min = 0) {
    // Returns a random number between min (inclusive) and max (exclusive)
    return min + Math.floor( max * Math.random() );
  }

function prepareQuiz() {
    document.querySelector("#firstContainer").classList.remove("loginPage");
    //Kommer ha endless loop om jag inte tar bort denna classen.
    if(!document.querySelector("#firstContainer").classList.contains("loginPage")) {
        
        getPicture();
        document.querySelector("#firstContainer").classList.add("quizPage");
    }

    return;
}

function getPicture() {
    let randomIndex = get_random_number(ALL_BREEDS.length, 0);
    let elementURL = ALL_BREEDS[randomIndex].url;
    console.log(elementURL);

    let dogPicture = `https://dog.ceo/api/breed/${elementURL}/images/random`;
    startFetch(dogPicture);
    return;
}
