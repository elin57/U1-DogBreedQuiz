"use strict";

async function startFetch(request) {
    const response = await fetch(request);
    statusUpdate(response.status);
    
    const resource = await response.json();
    return resource;
}