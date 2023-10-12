import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findAll, remove, save, update } from "../services/userService";
import  Swal  from 'sweetalert2'
import {loadingError, InitialUserForm, addUser, loadingUser, onCloseForm, onOpenForm, onUserSelectedForm, removeUser, updateUser } from "../store/slices/users/usersSlice";
import { useAuth } from "../auth/hooks/useAuth";

export const useUsers  = () => {
             
    const { users, userSelected, errors, visibleForm } = useSelector(state => state.users);
    const dispatch = useDispatch();

        
    
    const navigate = useNavigate();
    const {login, handlerLogOut} = useAuth();

    const getUsers = async() =>{
        try{
            const result = await findAll();
            dispatch (loadingUser(result.data));
        }
        catch(error){
            if( error.response?.status == 401){
                handlerLogOut();
            }
        }
    }
    

    const handlerAddUser = async (user) => {
        // si la id de usuario es 0 guarda el usuario
        if(!login.isAdmin )return;
        let response;
        try {
            if(user.id === 0 ){ 
                response = await save(user);
                dispatch(addUser({...user}))
            }else{
                response = await update(user);
                dispatch(updateUser({...response.data}));
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
            if(error.response && error.response.status == 400){
                dispatch(loadingError(error.response.data));
                //el else if de abajo controla el error 500
            }else if(error.response && error.response.status == 500 && 
                error.response.data?.message?.includes('constraint')) {
                    if(error.response.data?.message?.includes('UK_username')){
                        dispatch(loadingError({username: 'El username ya existe!'}))
                    }
                    if(error.response.data?.message?.includes('UK_email')){
                        dispatch(loadingError({username: 'El email ya existe!'}))
                    }
            }else if( error.response?.status == 401){
                setErrors({username: 'Usuario inactivo, volver a ingresar'})
                handlerLogOut();
            }
            else{
                throw error;
            }
        }
    }
      

    const handlerDeleteUser = (id) => {
        if(!login.isAdmin )return;
        Swal.fire({
            title: '¿Eliminar este usuario?',
            text: "Esto no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
          }).then( async(result)=> {
            if (result.isConfirmed) {
                try {
                    await remove(id);
                    dispatch(removeUser(id));
                    Swal.fire(
                        'Usuario Eliminado',
                        'El usuario ha sido elimando con exito!',
                        'success'
                    )
                
                } catch (error) {
                    if( error.response?.status == 401){
                        setErrors({username: 'Usuario inactivo, volver a ingresar'})
                        handlerLogOut();
                    }
                }
            }
          })
    }

    const handlerUserSelectedForm = (user) => {
        dispatch(onUserSelectedForm({ ...user}));
    }

    const handlerOpenForm = () => {
        //no se pasa argumento porque en el slice ya esta el valor que deberia tener
       dispatch(onOpenForm());
    }

    const handlerCloseForm = () => {
        dispatch(onCloseForm());
        dispatch(loadingError({}));
    }

//devuelve estos datos
    return {    
        users,
        userSelected,
        InitialUserForm ,
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