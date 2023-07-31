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
    pathName === "/prontuario-paciente" && setCurrentPage("Prontuário de paciente");
    pathName === "/cadastro-de-usuario" && setCurrentPage("Cadastro de usuário");
    pathName === "/editar-consulta" && setCurrentPage("Editar consulta");
    pathName === "/editar-exame" && setCurrentPage("Editar exame");
    pathName === "/editar-cadastro-paciente" && setCurrentPage("Cadastro de paciente");
    console.log(currentPage);
  };

  return (
    <PagesContext.Provider value={{ currentPage, PageSetCurrentPage }}>
      {children}
    </PagesContext.Provider>
  );
};
