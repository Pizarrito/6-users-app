import { useState } from "react"



const InitialUserForm = {
    username: '',
    password: '',
    email:'',
}



export const UserForm = () =>{

    const [userForm, setUserForm] = useState(InitialUserForm); // esta constante necesita los datos iniciales

    const { username, password, email } = userForm;

    const onInputChange = ({ target }) =>{
        const  { name, value } = target;
        setUserForm ({
            ...userForm,
            [name]:value,

        })

    }

    const onSubmit = (event) =>{
        event.preventDefault();
        console.log ("Enviando el formulario")


    }

    return (
        <form onScroll={onSubmit}>
            <input 
                className="form-control my-3 w-75"
                placeholder="Username"
                name="username"
                value={ username }
                onChange={ onInputChange}

            />
            <input 
                className="form-control my-3 w-75"
                placeholder="Password"
                type="password"
                value={ password }
                name="password"
                onChange={ onInputChange}
            />
            <input 
                className="form-control my-3 w-75"
                placeholder="Email"
                value={ email }
                name="Email"
                onChange={ onInputChange}
            />
            <button
            className= "btn btn-primary"
            type="submit"
            >Enviar    
            </button>
        </form>
    )

}