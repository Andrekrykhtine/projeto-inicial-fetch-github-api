import { getRepositories } from './services/repositories.js'
import { getUser } from './services/user.js'


import { user } from './objects/user.js'
import { screen } from './objects/screen.js'

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById("input-search").value
    if (validateEmptyInput(userName)) return
    getUserData(userName)
    getEventsProfile(userName);
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

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
  
    screen.renderUser(user)
}

async function getEvents(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}/events?per_page=10`);
    return await response.json();
}

function getEventsProfile(userName) {
    getEvents(userName).then(userEvents => {
        let eventsItens = ""; // Inicializa o HTML dos itens de eventos

        // Filtra os eventos desejados (CreateEvent e PushEvent)
        userEvents.forEach(event => {
            if (event.type === "CreateEvent" || event.type === "PushEvent") {
                let commitMessage = "Sem mensagem de commit";
                const eventsType = event.type;

                // Obtém a mensagem do commit, se disponível
                if (event.payload && event.payload.commits && event.payload.commits.length > 0) {
                    commitMessage = event.payload.commits[0].message;
                }

                // Adiciona o evento ao HTML
                eventsItens += `<li>${eventsType} - ${commitMessage}</li>`;
            }
        });

        // Atualiza o conteúdo HTML apenas uma vez, fora do loop
        document.querySelector(".events").innerHTML += `
            <div class="repositories section">
                <h2>Eventos</h2>
                <ul>${eventsItens}</ul>
            </div>
        `;
    }).catch(error => {
        console.error("Erro ao obter eventos:", error);
    });
}




