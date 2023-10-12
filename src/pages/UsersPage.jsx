import { UsersList } from "../components/UsersList";
import { UseModalForm } from "../components/UserModalForm";
import { useEffect } from "react";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";



export const UsersPage = () =>{ 
    const { 
        users,
        visibleForm, // valida el estado del formualario si mostrarlo o no 
        handlerOpenForm,
        getUsers
    } = useUsers();
    const { login } = useAuth();

    

    useEffect(()=>{
        getUsers();
    })

    return (
        <>
         {!visibleForm || 
            <UseModalForm/>
        }
        <div className="container my-4">
            <h2>Users App </h2>
                <div className="col">
                    {// si visible form es true o si el login trae el admin este boton se podra ver
                    }
                    { (visibleForm || !login.isAdmin ) || <button 
                        onClick={handlerOpenForm }
                        className="btn btn-primary my-2">
                            Nuevo Usuario
                        </button>
                     }
                    { users.length === 0 
                        ? <div className="alert alert-warning" >No hay usuarios en el sistema!</div>
                    :
                    <UsersList/>}
                </div>
            </div>
        </>
    ); 
}