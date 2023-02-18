"use strict";
async function startFetch(request) {
    const response = await fetch(request);
    console.log(response);
    statusUpdate(response.status);

    const resource = await response.json();
    console.log(resource);
    return resource;
    
}

/*async function getResource(whatRequest) {
    let resource = await startFetch(whatRequest);
    console.log(resource);
}*/


/*async function start_up(request) {
    const n1 = await getResource(request);
    console.log(n1);
 }*/
 

//All kommunikation med servrarna måste lösas med async och await. Metoden .then får inte förekomma i kodbasen.