"use strict";

function showProjects(json_file) {
    // TODO: Get the projects from JSON and append them to the page
    console.log('hiii');
    const fileReader = new FileReader();

    fileReader.addEventListener('load', () => {
        const projects = JSON.parse(fileReader.result);
        console.log(projects);
    });
    fileReader.readAsText(json_file);
    
}

document.onload = showProjects('js/projects.json');