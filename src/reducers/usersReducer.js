
export const usersReducer = (state  = [], action) => {

    switch (action.type) {
        case 'addUser':
            return[
                ...state,
                {
                    ...action.payload, // payload guarda el objeto usuario
                    id: new Date().getTime(),
                }
            ]
        case 'deleteUser':
            return state.filter(user => user.id !== action.payload);
            
        case 'updateUser':
            return state.map(u => {
                if(u.id === action.payload.id){
                    return { 
                        ...action.payload, // nuevo objeto usuario con los datos actualizados
                        password: u.password
                    };
                }
                return u;
            })
        default:
            return state;
    }


}
