import { useEffect, useState } from "react"
import { UserForm } from "../components/UserForm"
import { useParams } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";


//users se deja users=[] porque en caso de añadir un nuevo usuario este dato viene vacio y deja un error

export const RegisterPage = () => {

    const {users=[], InitialUserForm } = useUsers();

    const [ userSelected, setUserSelected ] = useState(InitialUserForm);

    const { id } = useParams();

    // si encuentra la id del usuario la añade a user si no de le pasan los datos por defectos

    useEffect(() => {
        if(id){
            const user = users.find(u => u.id == id) || InitialUserForm;
            // se le asigna a SetUserSelected dependiendo del caso el parametro user
            setUserSelected(user)
        }
        },[id]);

return(
    //si user selected es mayor a 0 cambia el titulo a editar
    <div className="container my-4">
        <h4>{userSelected.id > 0 ? 'Editar' : 'Registrar'}</h4>
        <div className="row">
            <div className="col">
                <UserForm userSelected={userSelected}/>
            </div>
        </div>
    </div>

)

}