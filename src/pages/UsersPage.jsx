import { UsersList } from "../components/UsersList";
import { UseModalForm } from "../components/UserModalForm";
 


export const UsersPage = ({
    users,
    userSelected,
    InitialUserForm,
    visibleForm, // valida el estado del formualario si mostrarlo o no 
    handlerAddUser,
    handlerDeleteUser,
    handlerUserSelectedForm,
    handlerCloseForm,
    handlerOpenForm
}
) =>{ 
    

    
    return (
        <>
         {!visibleForm || 
            <UseModalForm 
                userSelected = { userSelected }
                InitialUserForm = { InitialUserForm }
                handlerAddUser = { handlerAddUser}
                handlerCloseForm = { handlerCloseForm }
            >
        </UseModalForm>
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
                    <UsersList 
                        handlerUserSelectedForm = {handlerUserSelectedForm}
                        handlerDeleteUser = { handlerDeleteUser } 
                        users={ users } // users mantiene los datos del objeto 
                    />}
                </div>
            </div>
        </>
    ); 
}