

export const UserRow = ({ id, username, email }) =>{  //solo pasamos el user 
 
    return(
        <>
            
            <tr >
                <td>{ id }</td>
                <td>{ username } </td>
                <td>{ email}</td>
                <td>
                    <button 
                        type="button"
                        className="btn btn-secondary btn-sm">
                        update
                    </button>
                </td>
                <td> 
                    <button 
                        type="button"
                        className="btn btn-danger btn-sm">
                        delete
                    </button>
                </td>
            </tr>
        
        
        </>
    )


} 