import { getRepositories } from './services/repositories.js'
import { getUser } from './services/user.js'
import { getEvents } from './services/events.js'

import { user } from './objects/user.js'
import { screen } from './objects/screen.js'

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById("input-search").value
    if (validateEmptyInput(userName)) return
    getUserData(userName) 
});

document.getElementById('input-search').addEventListener('keyup', (e) => {
    // Obtém o nome de usuário e remove espaços em branco
    const userName = e.target.value.trim();

    // Verifica se a tecla pressionada é Enter
    const isEnterKeyPressed = e.key === 'Enter';

    if (isEnterKeyPressed) {
        // Verifica se o nome de usuário está vazio
        if (!userName) {
            console.warn('Por favor, insira um nome de usuário válido');
            return;
        }
    }
});

function validateEmptyInput(userName) {
    if (userName.length === 0) {// não colocou nada no imput
        alert('preencha o campo com o nome do usário')
        return true //para não prossegir 
    }
}

async function getUserData(userName) {

    const userResponse = await getUser(userName);
   
   
    
    if (userResponse.message === "Not Found") {
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)
    const eventsResponse = await getEvents(userName)
    
    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)
   

        screen.renderUser(user)
 
}







