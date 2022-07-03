export class simpleService {
    baseUrl = 'https://localhost:44325/'
    name = ''
    constructor(controllerName)
    {
        this.baseUrl += controllerName + '/'
        this.name = controllerName
    }
    async get(id)
    {
        let response = await fetch(this.baseUrl + 'get' + '?' + this.name + 'Id=' + id, {
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            }
        })
        let data = await response.json()
        return data
    }
    async response(method, entity) {
     
        const token = sessionStorage.getItem('access_token')
        let path = this.baseUrl + method+ '?' + this.name + 'Id=' + entity
        let m = method.toUpperCase()
        if(m === 'DELETE')
        {
            path = this.baseUrl + method + '?' + this.name + 'Id=' + entity
            console.log(token)
            let response = await fetch(path, {
                method: m,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + token
                }
            })
            return response.ok
        }
        if(m !== 'POST' && m !== 'PUT' && m !== 'DELETE')
        {
            m = 'GET'
            let response = await fetch(path, {
                method: m,
                header: {
                    'Content-Type': 'application/json'
                }
            })
            let data = await response.json()
            return data
        }
        path = this.baseUrl + method
        let response = await fetch(path, {
            method: m,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            },
            body: JSON.stringify(entity)
        })
        let data = await response.json()
        return data
    }
    async POST( entity){
        let path = this.baseUrl +'post'
        const token = sessionStorage.getItem('access_token')
        console.log(entity)
        console.log(path)

        let response = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            },
            body: JSON.stringify(entity)
        })
        let data = await response.ok
        return data
    }
    async PUTfilmselection(entity,method){
        let path = this.baseUrl + method+"?selId="+entity.selId+"&filmId="+entity.filmId
        const token = sessionStorage.getItem('access_token')
        let response = await fetch(path, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Authorization': 'bearer ' + token
            }
        })
        let data = await response.ok
        return data
    }
    // async DELETE( entity){
    //     let path = this.baseUrl +'delete?'+this.name+'Id='+entity
    //     const token = sessionStorage.getItem('access_token')
    //     console.log(path)
    //     console.log(entity)
    //     let response = await fetch(path, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'bearer ' + token
    //         }
           
    //     })
    //     let data = await response.ok
    //     return data
    // }
}