import { useEffect, useState } from "react"
import Swal from "sweetalert2";

export const UserForm = ( {handlerCloseForm  ,userSelected, handlerAddUser, InitialUserForm }) =>{

    const [userForm, setUserForm] = useState(InitialUserForm); // esta constante necesita los datos iniciales

    const {id, username, password, email } = userForm; // define como variables los datos del initialUserForm

    useEffect (() => {
        setUserForm({
            ...userSelected,
            password:'',
        });
    }, [ userSelected ]);

    const onInputChange = ({ target }) =>{
        const  { name, value } = target;
        setUserForm ({
            ...userForm,
            [name]:value, 

        })

    }

    const onSubmit = (event) =>{
        event.preventDefault();
        if (!username || (!password && id === 0 ) || !email){ // valida que el formulario no venga vacio 
            Swal.fire( // valida el formulario
                'Error de validacion',
                'Debe Completar los campos del formulario ',
                'error'
            )
            return 
        }
        // Aqui guardamos los datos que llegan del formulario
        handlerAddUser(userForm);        
        setUserForm(InitialUserForm);
        
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(InitialUserForm);


    }
    
    return (
        <form onSubmit={ onSubmit}>
            <input 
                className="form-control my-3 w-75"
                placeholder="Username"
                name="username"
                value={ username }
                onChange={ onInputChange}

            />
            {id > 0 || <input 
                className="form-control my-3 w-75"
                placeholder="Password"
                type="password"
                value={ password }
                name="password"
                onChange={ onInputChange}
            />}
            <input 
                className="form-control my-3 w-75"
                placeholder="Email"
                name="email"
                value={ email }
                onChange={ onInputChange}
            />
            <input type="hidden"
                name="id"
                value={ id } />
            <button
                className= "btn btn-primary"
                type="submit">
                { id > 0 ? 'Editar' : 'Crear' }    
            </button>
            <button 
                className="btn btn-primary mx-2"
                type="button"
                onClick={ onCloseForm}
                >
                    Cerrar
           </button>
        </form>
    )

}