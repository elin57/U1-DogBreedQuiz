"use strict";
async function startFetch(request) {
    const response = await fetch(request);
    console.log(response);
    statusUpdate(response.status);

    const resource = await response.json();
    console.log(resource);
    return resource;
    
}


//All kommunikation med servrarna måste lösas med async och await. Metoden .then får inte förekomma i kodbasen.