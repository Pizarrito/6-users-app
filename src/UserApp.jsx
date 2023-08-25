import { Navigate,Route, Routes } from "react-router-dom";
import { useAuth } from "./auth/hooks/useAuth"
import { LoginPage } from "./auth/pages/LoginPage"
import { UserRoutes } from "./routes/UserRoutes"



export const UserApp = () => {

    const {login,handlerLogIn,handlerLogOut  } = useAuth();
    return ( 
        <Routes> 
            {
                login.isAuth
                    ? (
                        <Route path='/*' element= { <UserRoutes 
                                login={login}
                                handlerLogOut={handlerLogOut} 
                            />}
                        />
                    )
                    :<>
                        <Route path='/login'
                                element= {<LoginPage 
                                    handlerLogIn={handlerLogIn}/>} />
                        <Route path="/*" element= { <Navigate to ="/login" /> }/>
                                
                    </>
            }
        </Routes>
    )
}