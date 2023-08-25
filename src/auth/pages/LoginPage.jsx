import { useContext, useState } from "react"
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const initialLoginForm = {
    username:'',
    password:'',
}

export const LoginPage = () => {

    const {handlerLogIn} = useContext(AuthContext);
    //crea la funcion login Form con sus datos de inicio
    const [ loginForm,  setLoginForm ] = useState(initialLoginForm);
    //loginForm maneja 2 datos username y password se puede ocupar el dato de loginForm y luego desestructurar
    const { username , password} = loginForm;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setLoginForm({
            ...loginForm,
            [ name ] : value,
        })
    }

    
    const onSubmit = (event) => {
        event.preventDefault();
        if(!username || !password){
            Swal.fire('Error de validacion', 'Username y password requeridos', 'error' );
        }
        handlerLogIn({username, password})

        setLoginForm(initialLoginForm); // llena el formulario con datos vacios
    }
    
return (
        <>
            <div className="modal" style={{display:'block'}} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Iniciar Sesion</h5>
                        </div>
                        <form onSubmit= { onSubmit }>
                            <div className="modal-body">
                                <input 
                                    className="form-control my-3 w-75"
                                    placeholder="Username"
                                    name="username"
                                    value={ username }
                                    onChange={ onInputChange }
                                    />
                                <input 
                                    className="form-control my-3 w-75"
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    value={ password }
                                    onChange={ onInputChange }/>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    className="btn btn-secondary" 
                                    type="submit">
                                        Login
                                </button>
                            </div>
                        </form>
                    </div>      
                </div>
            </div>
            
        </>
    )

}