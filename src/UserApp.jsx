import { UsersPage } from "./pages/UsersPage"
import { LoginPage } from "./auth/pages/LoginPage"
import { Navbar } from "./components/layout/Navbar"
import { useAuth } from "./auth/hooks/useAuth"



export const UserApp = () => {

    const {login,handlerLogin,handlerlogOut  } = useAuth();
    return ( 
        <>  
            {
                login.isAuth
                    ? (
                        <>
                            <Navbar
                                handlerlogOut={handlerlogOut}
                                login = {login}/>
                            <UsersPage/>
                        </>
                    )
                    
                    : <LoginPage  handlerLogin={handlerLogin}   />
            }
        </>
    )
}