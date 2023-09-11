import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import  Swal  from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";

const initialUsers = [];

const InitialUserForm = {
    id:0,
    username: '',
    password: '',
    email:'', 
}

const initialErrors = {
    id:'',
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

    const [errors, setErrors]= useState(initialErrors);
    const navigate = useNavigate();


    // se crea una funcion que retorne los datos iniciales de los usuarios
    //donde espera un dato debe de ser asyncrona y debe tener un await de esperea la funcion que trae la
    //promesa
    const getUsers = async() =>{
        const result = await findAll();
        dispatch ({
            type:'loadingUsers',
            //le pide que consulte a result su data...
            payload:result.data,
        });
    }

    
    // al tener que cargar un archivo de services debe convertirce en una funcion asincronica con 
    // await
    const handlerAddUser = async (user) => {
        // si la id de usuario es 0 guarda el usuario
        let response;
        try {
        // el await save devuelve un dato por eso necesitamos guardar el dato en una variable
        // si la id no es 0 debe busca la id y la actualiza.
        if(user.id === 0 ){ 
            response = await save(user);
        }else{
            response = await update(user);
        }
        dispatch ({
            type : (user.id === 0) ?  'addUser' : 'updateUser' , //define type para llamar al userReducer
            payload: response.data, // pasa el usuario
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
    } catch (error) {
            console.error(error);
        }
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
                remove(id);
                dispatch ({
                    type: 'deleteUser',
                    payload:id
                });
                Swal.fire(
                    'Usuario Eliminado',
                    'El usuario ha sido elimando con exito!',
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
        errors,
        handlerAddUser,
        handlerDeleteUser,
        handlerUserSelectedForm,
        handlerCloseForm,
        handlerOpenForm,
        getUsers,
    }

    }