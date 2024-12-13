const user = {
    avatarUrl: ' ',
    bio: ' ',
    userName: ' ',
    repositories: [], //colchetes pois o repositories que vem do github é em forma de array.
    events: [],

    setInfo(gitHubUser) {
        this.avatarUrl = gitHubUser.avatar_url//o this retoma o campo avatarUrl 
        this.name = gitHubUser.name
        this.bio = gitHubUser.bio
        this.userName = gitHubUser.login
        this.following = gitHubUser.following
        this.followers = gitHubUser.followers
    },

    setRepositories(respositories) {
        this.repositories = respositories
    },

    setEvents(events){
        this.events = events
    }
}

export { user }