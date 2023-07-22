import { createContext, useState } from "react";

export const PagesContext = createContext();

export const PagesProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("");

  const PageSetCurrentPage = (pathName) => {
    pathName === "/" && setCurrentPage("Home");
    pathName === "/cadastro-consulta" && setCurrentPage("Cadastrar consulta");
    pathName === "/cadastro-exame" && setCurrentPage("Cadastrar exame");
    pathName === "/cadastro-paciente" && setCurrentPage("Cadastrar paciente");
    pathName === "/prontuarios" && setCurrentPage("Prontuários");
    pathName === "/prontuario-paciente" && setCurrentPage("prontuário de paciente");
    pathName === "/cadastro-de-usuario" && setCurrentPage("Cadastro de usuário");
    pathName === "/perfil-de-usuario" && setCurrentPage("Perfil de usuário");
    console.log(currentPage);
  };

  return (
    <PagesContext.Provider value={{ currentPage, PageSetCurrentPage }}>
      {children}
    </PagesContext.Provider>
  );
};
