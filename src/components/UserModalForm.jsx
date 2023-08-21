import { UserForm } from "./UserForm"

export const UseModalForm =  ({handlerCloseForm, InitialUserForm, userSelected, handlerAddUser}) => {

    
    
    return(
        <>
            <div className="abrir-modal animacion fadeIn">
                <div className="modal" style={{ display: "block" }} tabIndex="-1">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    { userSelected.id > 0? 'Editar' : 'Crear' } modal Usuarios 
                                </h5>
                            </div>
                            <div className="modal-body ">
                                <UserForm 
                                    handlerCloseForm = { handlerCloseForm }
                                    InitialUserForm = { InitialUserForm }
                                    userSelected = {userSelected}
                                    handlerAddUser = { handlerAddUser }  // recibe el usuario y lo guarda
                                />    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        




        </>

    )
}
