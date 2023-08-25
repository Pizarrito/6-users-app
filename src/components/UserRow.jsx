import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../context/UserContext"


export const UserRow = ({id,username,email }) =>{  //solo pasamos el user 
  
const {handlerUserSelectedForm,handlerDeleteUser } = useContext(UserContext);



    return(
        <>
            
            <tr >
                <td>{ id }</td>
                <td>{ username } </td>
                <td>{ email}</td>
                <td>
                    <button 
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => handlerUserSelectedForm ({
                            id,
                            username,
                            email,
                            
                        })}>
                        update
                    </button>
                </td>
                <td>
                    <NavLink
                        className= {'btn btn-secondary btn-sm'}
                        to={'/users/edit/'+ id } >
                        Update Route
                    </NavLink>
                </td>
                <td> 
                    <button 
                        type="button"
                        onClick={() => handlerDeleteUser(id)}
                        className="btn btn-danger btn-sm">
                        delete
                    </button>
                </td>
            </tr>
        
        
        </>
    )


} 