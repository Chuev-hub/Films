import hash from "./passwordService"

export default class userService {
    static isLogin = false
    static login = ''
    static id = 0
    static isAdmin = false;
    baseUrl = 'https://localhost:44325/user/'
    async login(login, password) {
        let user = {
            login: login,
            passwordHash: hash(password)
        }
        let response = await fetch(this.baseUrl + 'token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        let data = await response.json()
        if(response.ok === true)
        {
            userService.isLogin = response.ok
            userService.login = data.username
            userService.id = data.id
            sessionStorage.setItem('id', data.id)
            sessionStorage.setItem('access_token', data.access_token)
            sessionStorage.setItem("isLogin",true)
            sessionStorage.setItem("username", data.username)
            sessionStorage.setItem("isAdmin",false)
            
            await this.setIsAdmin(data.username)
            console.log( sessionStorage.getItem("isAdmin"))
        }        
        return {ok: response.ok, error: data.error}
    }
    static async retoken() {
        let login = sessionStorage.getItem("username")
        const token = sessionStorage.getItem('access_token')
        console.log(token)
        let response = await fetch('https://localhost:44325/user/retoken?login=' + login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token                
            }
        })
        let data = await response.json()
        sessionStorage.setItem('access_token', data.token)
    }
    async registration(login, email, password) {
        let user = {
            login: login,
            email: email,
            passwordHash: hash(password)
        }
        let response = await fetch(this.baseUrl + 'registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        if(response.ok === false)
        {
            let data = await response.json()
            return { ok: response.ok, error: data.error }
        }
        return { ok: response.ok, error: '' }
    }
    async setIsAdmin(login)
    {
        let res = await fetch(this.baseUrl + 'user?login=' + login)
        let data = await res.json()
        let response = await fetch('https://localhost:44325/role/get?roleId=' + data.roleId)
        let role = await response.json()
        console.log(role.name)
        if(role.name === 'admin')
            sessionStorage.setItem('isAdmin', true)
        else
            sessionStorage.setItem('isAdmin', false)
    }
    async changepassword(pass)
    {
        let user = {
            login: sessionStorage.getItem('username'),
            passwordHash: hash(pass)
        }
        const token = sessionStorage.getItem('access_token')
        let response = await fetch(this.baseUrl + 'changePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            },
            body: JSON.stringify(user)
        })
        console.log(response.ok)
        return response.ok
    }
}