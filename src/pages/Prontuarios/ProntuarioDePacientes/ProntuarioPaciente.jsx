import { PagesContext } from "../../../context/PagesContext";
import { PacienteContext } from "../../../context/PacienteContext";
import { useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import Prontuarios from "../../../components/Prontuarios/Prontuarios";

export default function ProntuarioPaciente() {
  const { PageSetCurrentPage } = useContext(PagesContext);
  const {PacienteSelecionado} = useContext(PacienteContext);
  const navigate = useLocation();
  const pathName = navigate.pathname;

  useEffect(() => {
    PageSetCurrentPage(pathName);
    console.log(pathName);
  }, []);




  return (
    <>
      <h1>Paciente : {PacienteSelecionado.nome}</h1>
      <h3>Convênio : {PacienteSelecionado.convenio}</h3>
      <h3>Contato de emergência: {PacienteSelecionado.contatoDeEmergencia}</h3>
      <h3>Alergias : {PacienteSelecionado.alergias}</h3>
      <h3>Cuidados específicos: {PacienteSelecionado.cuidadosEspecificos}</h3>
      <Prontuarios/>
    </>
  );
}
