import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({children}) =>{

    const {login,handlerLogIn,handlerLogOut  } = useAuth();

    return (
       
        <AuthContext.Provider value={
            {

                login,
                handlerLogIn,
                handlerLogOut  
            }

        }> 
        {children}
        </AuthContext.Provider>
        

    )
}