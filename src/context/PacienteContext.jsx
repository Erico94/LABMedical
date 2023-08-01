import { createContext, useState } from "react";

export const PacienteContext = createContext();

export const PacienteProvider = ({children}) =>{

    const [PacienteSelecionado, setPacienteSelecionado] = useState({});
    const [exame, setExame] = useState({});
    const [consulta, setConsulta] = useState({});


    const SetPaciente = (paciente) =>{
        setPacienteSelecionado(paciente)
    }

    const SetExame= (exame)=>{
        setExame(exame);
    }

    const SetConsulta=(consulta)=>{
        setConsulta(consulta);
    }

    

    return (
        <PacienteContext.Provider value={{PacienteSelecionado, SetPaciente, SetExame, SetConsulta, consulta, exame}}>
            {children}
        </PacienteContext.Provider>
    )
}