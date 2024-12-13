const screen = {//o que coloca o novo html na tela
    userProfile: document.querySelector(".profile-data"),
    renderUser(user) {//criação de um metodo
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="Foto do perfil">
                            <div class ="data">
                                <h1>${user.name ?? 'Não possui nome cadastrado 🥲'}</h1>
                                <p>${user.bio ?? 'Não possui bio cadastrado 🥲'}</p>
                                <p> Followers: ${user.followers}</p>
                                <p> Following: ${user.following}</p>
                            </div>
                         </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`);

        if (user.repositories.length > 0) {//verificação  se tem repositorio.
            this.userProfile.innerHTML += `<div class="repositories section ">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
                                        }
        let eventsItens = ""; // Inicializa o HTML dos itens de eventos
         // Filtra os eventos desejados (CreateEvent e PushEvent)
        user.events.forEach(event => {
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
        this.userProfile.innerHTML +=  `<div class="repositories section">
                                            <h2>Eventos</h2>
                                            <ul>${eventsItens}</ul>
                                        </div>`;
                                        
        
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3> ";
    }
}

export { screen }

