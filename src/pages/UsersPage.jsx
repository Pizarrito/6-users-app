import { UsersList } from "../components/UsersList";
import { UseModalForm } from "../components/UserModalForm";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
 


export const UsersPage = () =>{ 
    const { 
        users,
        visibleForm, // valida el estado del formualario si mostrarlo o no 
        handlerOpenForm
    } = useContext(UserContext);

    
    return (
        <>
         {!visibleForm || 
            <UseModalForm/>
        }
        <div className="container my-4">
            <h2>Users App </h2>
                <div className="col">
                    { visibleForm || <button 
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