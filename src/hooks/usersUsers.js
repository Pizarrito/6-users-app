import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import  Swal  from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const initialUsers = [
    {
        id:1,
        username: 'pepe',
        password: '12345',
        email: 'pepe@correo.gmail'
    }
];

const InitialUserForm = {
    id:0,
    username: '',
    password: '',
    email:'', 
}
export const useUsers  = () => {
    //users es la variable que almacena los usuarios 
    const [ users, dispatch ] = useReducer(usersReducer, initialUsers); 
    const [ userSelected, setUserSelected ] = useState(InitialUserForm);
    // maneja el estado del formulario si es visible o no
    const [ visibleForm, setVisibleForm ] = useState(false); // por defecto el formulario queda invicible
    // navigate permite hacer redirecciones automaticas despues de completar un accion o un evento

    const navigate = useNavigate();


    const handlerAddUser = (user) => {
        dispatch ({
            type : (user.id === 0) ?  'addUser' : 'updateUser' , //define type para llamar al userReducer
            payload: user, // pasa el usuario
        });

        Swal.fire(
            ( user.id === 0) ? 
                'Usuario Creado': 
                'Usuario Actualizado',
            ( user.id === 0) ? 
                'El usuario se crea con exito' : 
                'El usuario ha sido actualizado con exito',
            'success'
        )

        handlerCloseForm();
        // redirigue a /users
        navigate('/users'); 


    }    

    const handlerDeleteUser = (id) => {
        Swal.fire({
            title: '¿Eliminar este usuario?',
            text: "Esto no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                dispatch ({
                    type: 'deleteUser',
                    payload:id
                }),
                'Eliminado',
                'success'
              )
            }
          })
    }

    const handlerUserSelectedForm = (user) => {
        
        setVisibleForm(true);
        setUserSelected({ ...user }); // selecciona el usuario 
    }

    const handlerOpenForm = () => {
        setVisibleForm(true)
    }

    const handlerCloseForm = () => {
        setVisibleForm(false)
        setUserSelected(InitialUserForm)
    }

//devuelve estos datos
    return {    
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
}