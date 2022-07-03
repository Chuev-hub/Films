import hash from "./passwordService"

export default class filmService {
    static isLogin = false
    static login = ''
    static isAdmin = false;
    baseUrl = 'https://localhost:44325/film/'
    async getFilm(id) {
        let response = await fetch(this.baseUrl+'get' + '?filmId='+id)
        let data = await response.json()
        return data
    }
    async getActors(id) {
        let response = await fetch(this.baseUrl+'Actors' + '?filmId='+id)
        let data = await response.json()
        return data
    } 
     async getDirectors(id) {
        let response = await fetch(this.baseUrl+'Directors' + '?filmId='+id)
        let data = await response.json()
        return data
    } 
     async getGenres(id) {
        let response = await fetch(this.baseUrl+'Genres' + '?filmId='+id)
        let data = await response.json()
        return data
    } 
     async getProducers(id) {
        let response = await fetch(this.baseUrl+'Producers' + '?filmId='+id)
        let data = await response.json()
        return data
    } 
     async getSelections(id) {
        let response = await fetch(this.baseUrl+'Selections' + '?filmId='+id)
        let data = await response.json()
        return data
    } 
    async getAll(id) {
        let response = await fetch(this.baseUrl+'all' + '?filmId='+id)
        let data = await response.json()
        return data
    } 
     
}