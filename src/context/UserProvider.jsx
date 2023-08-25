import { useUsers } from "../hooks/usersUsers";
import { UserContext } from "./UserContext"


export const UserProvider = ({children}) => {
        // maneja los datos iniciales
        const {       
            users,
            userSelected,
            InitialUserForm,
            visibleForm, // valida el estado del formualario si mostrarlo o no 
            handlerAddUser,
            handlerDeleteUser,
            handlerUserSelectedForm,
            handlerCloseForm,
            handlerOpenForm
        } = useUsers(); // llama los datos de useUsers de su return 


    return(
        <UserContext.Provider value={
            {
                users,
                userSelected,
                InitialUserForm,
                visibleForm, 
                handlerAddUser,
                handlerDeleteUser,
                handlerUserSelectedForm,
                handlerCloseForm,
                handlerOpenForm
            }
        }>
            {children}
        </UserContext.Provider>
    )



}