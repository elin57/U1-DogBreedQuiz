async function getResource(request) {
    let response = await fetch(request);
    console.log(response);
    statusUpdate(response.status);
    let resource = await response.json();
    console.log(resource);
}

//All kommunikation med servrarna måste lösas med async och await. Metoden .then får inte förekomma i kodbasen.