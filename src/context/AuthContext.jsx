import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [usuarioLogado, setUsuarioLogado] = useState({});


    const Authlogin = (userData) =>{
        setUsuarioLogado(userData);
        setLoggedIn(true);
    }

    const AuthLogout = () =>{
        setLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, usuarioLogado, Authlogin, AuthLogout}}>
            {children}
        </AuthContext.Provider>
    )
}