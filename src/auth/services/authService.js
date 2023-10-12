
import axios from "axios"

const BASE_URL = 'http://localhost:8080/login';

export const loginUser =  async ({username, password}) => {
    console.log (username, password);
    try{
        return await axios.post(BASE_URL,{
            username,
            password
        },
        );
    }catch(error){
        throw error;
    }

     

}