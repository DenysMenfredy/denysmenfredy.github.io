"use strict";

function showProjects() {
    // TODO: Get the projects from JSON and append them to the page
    console.log('hiii');
    // const fileReader = new FileReader();

    // fileReader.addEventListener('load', () => {
    //     const projects = JSON.parse(fileReader.result);
    //     console.log(projects);
    // });
    // fileReader.readAsText(json_file);
    let req = new XMLHttpRequest();
    let projectsSection = document.querySelector('.projects');
    req.onreadystatechange = () => {
        if(req.readyState === XMLHttpRequest.DONE) {
            if(req.status === 200) {
                const projects = JSON.parse(req.responseText).record.Projects;
                for(let project of projects) {
                    console.log(project);
                    let projectDiv = document.createElement('div');
                    projectsSection.appendChild(projectDiv);
                    projectDiv.className = 'project';
                    let projectTitle = document.createElement('h3');
                    projectTitle.innerText = project.title;
                    projectDiv.appendChild(projectTitle);
                    let projectDescription = document.createElement('p');
                    projectDescription.innerText = project.description;
                    projectDiv.appendChild(projectDescription);
                    let projectLink = document.createElement('a');
                    projectLink.setAttribute('href', project.link);
                    projectLink.setAttribute('target', '_blank');
                    projectLink.innerText = 'Link';
                    projectDiv.appendChild(projectLink);
                    let languages = document.createElement('p');
                    languages.innerText = `Languages: ${project.languages.join(', ')}`;
                    projectDiv.appendChild(languages);
                }
            }
            
                
        }
    }
    const url = 'https://api.jsonbin.io/v3/b/61b16bfb62ed886f915cada6/latest';
    req.open('GET', url, true);
    const apiKey = "$2b$10$UQHXlckxYv/6Ox617tJzWeJbIMis2xSjnSIMEaE3hFNPXxkGe538q";
    req.setRequestHeader("X-Master-Key", apiKey);
    req.send();
}

document.onload = showProjects();