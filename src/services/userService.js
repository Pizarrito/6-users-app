import usersApi from "../apis/usersApi";

const BASE_URL = '';


//es una funcion que espera una respuesta por eso debe de ser
//asyncrona 
export const findAll = async () => {
    try {
        const response = await usersApi.get(BASE_URL);
        return response;
    } catch (error) {
        console.error(error)
        throw error;
    }
    return null;
}
//funcion que crea los datos
export const save = async({ username, email, password, admin }) => {
    try {
         return await usersApi.post(BASE_URL,{
                username,
                email,
                password,
                admin,
            });   
    } catch (error) {
        throw error;
        
    }
    return undefined;
}
//funcion que actualiza los datos, necesitamos id 
//como habiamos puesto en el back solo necesitamos 2 datos
//username y el mail 
export const update = async({id, username, email, admin }) => {
    try {
        return await usersApi.put(`${BASE_URL}/${id}`,{
            username,
            email,
            admin,
            // el update valida de todas formas el password lo pasamos como nothing para que no nos de problemas
            //ya que en el back solo se actualiza username y email
            //password:'nothing',
        });
    } catch (error) {
        throw error;
    }
    return undefined;

}

export const remove = async (id) => {
    try {
        return await usersApi.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw(error);
    }
}