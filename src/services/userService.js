import axios from "axios"

const BASE_URL = 'http://localhost:8080/users';

//es una funcion que espera una respuesta por eso debe de ser
//asyncrona 
export const findAll = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response;
    } catch (error) {
        console.error(error)
    }
}
//funcion que crea los datos
export const save = async({ username, email, password }) => {
    try {
         return await axios.post(BASE_URL,{
                username,
                email,
                password,   
            })   
    } catch (error) {
        throw error;
        
    }
    return undefined;
}
//funcion que actualiza los datos, necesitamos id 
//como habiamos puesto en el back solo necesitamos 2 datos
//username y el mail 
export const update = async({id, username, email }) => {
    try {
        return await axios.put(`${BASE_URL}/${id}`,{
            username,
            email,
        })
    } catch (error) {
        throw error;
    }
    return undefined;

}

export const remove = async (id) => {
    try {
        return await axios.delete(`${BASE_URL}/${id}`)
    } catch (error) {
        console.error(error);
    }
    return undefined;
}