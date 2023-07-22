import { createContext, useState } from "react";

export const PacienteContext = createContext();

export const PacienteProvider = ({children}) =>{

    const [PacienteSelecionado, setPacienteSelecionado] = useState({});


    const SetPaciente = (paciente) =>{
        setPacienteSelecionado(paciente)
    }

    

    return (
        <PacienteContext.Provider value={{PacienteSelecionado, SetPaciente}}>
            {children}
        </PacienteContext.Provider>
    )
}