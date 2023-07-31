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
      <div className="container container  border border-secondary rounded-3 mb-3 w-75">
      <span>Paciente :</span><span className="fs-3 fw-bold"> {PacienteSelecionado.nome}</span>
      <div className="container ">

      <h4 className="mt-2">Convênio : {PacienteSelecionado.convenio}</h4>
      <h4 className="mt-2">Contato de emergência: {PacienteSelecionado.contatoDeEmergencia}</h4>
      <h4 className="mt-2">Alergias : {PacienteSelecionado.alergias}</h4>
      <h4 className="mt-2 border-bottom border-4 border-secondary pb-2">Cuidados específicos: {PacienteSelecionado.cuidadosEspecificos}</h4>
      <Prontuarios/>
      </div>
      </div>
    </>
  );
}
