import { NavLink } from "react-router-dom"


export const UserRow = ({ handlerUserSelectedForm, handlerDeleteUser,id, username, email }) =>{  //solo pasamos el user 
  



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