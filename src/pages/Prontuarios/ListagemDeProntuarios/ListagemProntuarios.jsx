import { PagesContext } from "../../../context/PagesContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { filtrarPacientes } from "../../../service/web";
import { PacienteContext } from "../../../context/PacienteContext";

export default function ListagemProntuarios() {
  const { PageSetCurrentPage } = useContext(PagesContext);
  const {SetPaciente} = useContext(PacienteContext);
  const navegue = useNavigate();
  const navigate = useLocation();
  const pathName = navigate.pathname;
  const [termoBuscado, setTermoBuscado] = useState("");
  const [itensFiltrados, setItensFiltrados] = useState([]);
  const [foiSelecionado, setFoiSelecionado] = useState(false);

  useEffect(() => {
    PageSetCurrentPage(pathName);
    console.log(pathName);
  }, []);

  useEffect(() => {
    async function FiltrarPacientes() {
      const pacientes = await filtrarPacientes(termoBuscado);
      setItensFiltrados(pacientes);
    }
    FiltrarPacientes();
  }, [termoBuscado]);

  const handleChangeBusca = async (event) => {
    setTermoBuscado(event.target.value);
  };

  const selecaoDePaciente = (paciente) => {
    SetPaciente(paciente);
    navegue ("/prontuario-paciente")
  };

  function inputDeBuscaDePaciente() {
    return (
      <>
        <label htmlFor="nomeOuId">Nome ou id:</label>
        <input
          autoFocus
          type="text"
          name="nomeOuId"
          id="nomeOuId"
          value={termoBuscado}
          onChange={handleChangeBusca}
        />
      </>
    );
  }

  return (
    <>
      <h1>Prontuarios</h1>
      <h3>Selecione um paciente para ver prontuário.</h3>
      {!foiSelecionado && inputDeBuscaDePaciente()}
      {!foiSelecionado && (
        <ul>
          {itensFiltrados.map((item, index) => {
            return (
              <li key={index} onClick={() => selecaoDePaciente(item)}>
                {item.nome}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
