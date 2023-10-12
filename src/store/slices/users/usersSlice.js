import { createSlice } from "@reduxjs/toolkit";


//a diferencia del reducer que viene con react este se hace con funciones, hasta ahora 
//la unica mejora es que el codigo queda mas limpio ya que en sintaxis es muy parecido al reducer

export const InitialUserForm = {
    id:0,
    username: '',
    password: '',
    email:'', 
    admin: false
}

const initialErrors = {
    id:'',
    username: '',
    password: '',
    email:'', 
}

//se crea el slice con la funcion de redux createSlice
export const usersSlice = createSlice({
    //se crea el nombre para este slice, que es como un reducer 
    name:'users',
    initialState:{
        //se deja con corcheter porque es un arreglo, aqui se almacenan los usuarios 
        users: [],
        userSelected: InitialUserForm,
        visibleForm: false,
        errors: initialErrors
    },
    reducers:{
        //se le pasan los parametros
        addUser: (state, action) => {
            state.users = [
                //se obtiene el estado actual y obtenemos los users
                ...state.users,
                {
                    //Se obtiene el cuerpo, es decir los datos
                    ...action.payload,

                }
            ]
            state.userSelected = InitialUserForm;
            state.visibleForm = false;
        },
        //se compara si en los usuarios hay un usuario que comparta la misma id, si lo encuentra lo elimina y guarda
        //el arreglo sin el dato eliminado.
        removeUser: (state, action) =>{
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        updateUser: (state,action) => {
            //se recorre los usuarios, busca la id si lo encuentra trae el cuerpo de la id y lo edita
            state.users = state.users.map(u => {
                if(u.id === action.payload.id){
                    return { 
                        ...action.payload, // devuelve nuevo objeto usuario con los datos actualizados
                    };
                }
                return u;
            });
            state.userSelected = InitialUserForm;
            state.visibleForm = false;
        },
        //carga los usuarios con su cuerpo.
        loadingUser : (state, action) => {
            state.users = action.payload;
        },
        onUserSelectedForm : (state, action) => {
            state.userSelected = action.payload;
            state.visibleForm = true;
        },
        onOpenForm : (state) => {
            state.visibleForm = true;
        },
        onCloseForm : (state) => {
            state.visibleForm = false;
            state.userSelected = InitialUserForm;
        },
        loadingError : (state, action) => {
            state.errors = action.payload;
            
        }

    }
});

//se exportan las funciones 
export const {
    loadingError,
    addUser,
    removeUser,
    updateUser,
    loadingUser,
    onUserSelectedForm,
    onOpenForm,
    onCloseForm
} = usersSlice.actions;