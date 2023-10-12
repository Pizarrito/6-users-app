import { useEffect, useState } from "react"
import { useUsers } from "../hooks/useUsers";

export const UserForm = ( { handlerCloseForm  ,userSelected }) =>{

    const { InitialUserForm, handlerAddUser, errors } = useUsers();

    const [userForm, setUserForm] = useState(InitialUserForm); // esta constante necesita los datos iniciales
    
    const [ checked,  setChecked ] = useState(userForm.admin);
    
    const {id, username, password, email, admin } = userForm; // define como variables los datos del initialUserForm

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
       /* if (!username || (!password && id === 0 ) || !email){ // valida que el formulario no venga vacio 
            Swal.fire( // valida el formulario
                'Error de validacion',
                'Debe Completar los campos del formulario ',
                'error'
            )
            return 
        }
        if(!email.includes('@')) {
            Swal.fire( // valida el formulario
                'Error de validacion de email',
                'El email debe ser valido, incluir un @ ',
                'error'
            )
            return 
        }
        */
        // Aqui guardamos los datos que llegan del formulario
        handlerAddUser(userForm);                
    }
    //se le asigna el valor a la inversa al precionar el checkbox
    const onCheckboxChange = () => {
        setChecked(!checked);
        setUserForm(
            {
                ...userForm,
                admin: checked,
            }
        );
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
                onChange={ onInputChange}/>
            <p className="text-danger">{errors?.username}</p>

            {id > 0 || <input 
                className="form-control my-3 w-75"
                placeholder="Password"
                type="password"
                value={ password }
                name="password"
                onChange={ onInputChange}/>}
            <p className="text-danger">{errors?.password}</p>
            <input 
                className="form-control my-3 w-75"
                placeholder="Email"
                name="email"
                value={ email }
                onChange={ onInputChange}/>
            <p className="text-danger">{errors?.email}</p>

            <div className="my-3 form-check">
                <input type="checkbox"
                    name="admin"
                    checked= {admin} 
                    className="form-check-input"
                    onChange={ onCheckboxChange}
                />
                <label className="form-check-label">Admin</label>  
                

            </div>

            <input type="hidden"
                name="id"
                value={ id } />
            <button
                className= "btn btn-primary"
                type="submit">
                { id > 0 ? 'Editar' : 'Crear' }    
            </button>
            
            {!handlerCloseForm ||<button 
                className="btn btn-primary mx-2"
                type="button"
                onClick={()=> onCloseForm()}
                >
                    Cerrar
           </button>
            }
        </form>
    )

}