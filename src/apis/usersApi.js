import axios from "axios";

const usersApi = axios.create({
    
    baseURL: 'http://localhost:8080/users',

})
//se crea el interceptor 
usersApi.interceptors.request.use(config => {
    //se configura el headers de la respuesta 
    config.headers = { 
        ...config.headers,
        'Authorization' : sessionStorage.getItem('token')   
    }
    return config;
})

export default usersApi;