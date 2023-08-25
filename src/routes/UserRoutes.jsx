import {Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../components/layout/Navbar"
import { UsersPage } from "../pages/UsersPage"
import { RegisterPage } from "../pages/RegisterPage"
import { useUsers } from "../hooks/usersUsers"



export const UserRoutes = ({ login, handlerLogOut}) => {

        // maneja los datos iniciales
        const {       
            users,
            userSelected,
            InitialUserForm,
            visibleForm, // valida el estado del formualario si mostrarlo o no 
            handlerAddUser,
            handlerDeleteUser,
            handlerUserSelectedForm,
            handlerCloseForm,
            handlerOpenForm
        } = useUsers(); // llama los datos de useUsers de su return 

    return (
        <>
            <Navbar login = {login} handlerLogOut={handlerLogOut}/>
            <Routes>
                <Route path="users" element={<UsersPage 
                    users = {users}
                    userSelected = {userSelected}
                    InitialUserForm= {InitialUserForm}
                    visibleForm = {visibleForm}
                    handlerAddUser={ handlerAddUser}
                    handlerDeleteUser={handlerDeleteUser}
                    handlerUserSelectedForm = {handlerUserSelectedForm}
                    handlerCloseForm = {handlerCloseForm}
                    handlerOpenForm = {handlerOpenForm}

                />} />
                <Route path="users/register" element={ <RegisterPage 
                        handlerAddUser={handlerAddUser}
                        InitialUserForm={InitialUserForm}
                />}></Route>
                <Route path="users/edit/:id" element={ <RegisterPage 
                    users = {users}
                    handlerAddUser={handlerAddUser}
                    InitialUserForm={InitialUserForm}
                />}></Route>
                <Route path="/" element={<Navigate to="/users"/> } />
            </Routes>
        </>
    )
} 