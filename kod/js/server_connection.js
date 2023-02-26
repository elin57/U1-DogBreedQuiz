"use strict";

async function startFetch(request) {
    const response = await fetch(request);
    statusUpdate(response.status);
    console.log(response);
    
    const resource = await response.json();
    console.log(resource);
    return resource;
}