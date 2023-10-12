import Swal from "sweetalert2"
import { loginUser } from "../services/authService"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { onLogOut, onLogin } from "../../store/slices/auth/authSlice"


//datos necesarios para iniciar sesion


export const useAuth = () => {
    //se traen estos datos del reducer
    //const [ login, dispatch ] = useReducer(loginReducer, initialLogin)
    const dispatch = useDispatch();
    const {user, isAdmin, isAuth} = useSelector(state => state.auth);
     

    const navigate = useNavigate();


    const handlerLogIn = async ({username, password}) => {
        
        try{
            //desestructura la respuesta que trae del loginUser con los parametros
            //username y password que viene de la vista
            console.log(username, password)
            const response = await loginUser({username, password});
            console.log(response)
            //guarda el token
            const token = response.data.token;
            //se divide el claims, que trae los datos. Los divide por el punto
            const claims = JSON.parse(window.atob(token.split(".")[1])); 
            console.log(claims); 
            
            //guarda el nombre del usuario
            const user = { username: claims.username }
            //manda estos datos al dispatch que se ocupa en authSlice
            dispatch(onLogin({user, isAdmin:claims.isAdmin}));
            
            //esto tambien se manda pero al session storage
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                isAdmin: claims.isAdmin,
                user,
            }));

            //se manda el token a la sessionStorage
            sessionStorage.setItem('token', `Bearer ${token}`);
            //redirecciona a la ruta users
            navigate('/users') 
        }catch (error){
            if(error.response?.status == 401) {
                //si no trae datos mostrar que trae errores
                Swal.fire('Error', 'username o password invalidos', 'error');
            }if(error.response?.status == 403) {
                Swal.fire('Error', 'Sin autorizacion', 'error');
            }else{
                throw error;
            }
        }
    }
// deslogea al usuario, remueve del session storage el login
    const handlerLogOut = () => {
        dispatch(onLogOut());
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('login');
        sessionStorage.clear();
    }

    
    return {
        login:{
            user,
            isAdmin,    
            isAuth        
        },
        handlerLogIn,
        handlerLogOut

    }
}