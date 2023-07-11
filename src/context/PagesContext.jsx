import { createContext, useState } from "react";

export const PagesContext = createContext();

export const PagesProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("");

  const PageSetCurrentPage = (pathName) => {
    pathName === "/" && setCurrentPage("Página inicial");
    pathName === "/cadastro-consultas" && setCurrentPage("Cadastrar consulta");
    pathName === "/cadastro-exames" && setCurrentPage("Cadastrar exame");
    pathName === "/cadastro-pacientes" && setCurrentPage("Cadastrar paciente");
    pathName === "/listagem-prontuarios" && setCurrentPage("Listagem de prontuários");
    pathName === "/prontuario-pacientes" && setCurrentPage("prontuário de paciente");
    pathName === "/cadastro-de-usuario" && setCurrentPage("Cadastro de paciente");
    pathName === "/perfil-de-usuario" && setCurrentPage("Perfil de usuário");
    console.log(currentPage);
  };

  return (
    <PagesContext.Provider value={{ currentPage, PageSetCurrentPage }}>
      {children}
    </PagesContext.Provider>
  );
};
