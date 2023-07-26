import { PagesContext } from "../../context/PagesContext";
import { PacienteContext } from "../../context/PacienteContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { GetAll, filtrarPacientes } from "../../service/web";
import CardPaciente from "../../components/CardPaciente/CardPaciente";

export default function Home() {
  const { PageSetCurrentPage } = useContext(PagesContext);
  const { SetPaciente } = useContext(PacienteContext);
  const navigate = useLocation();
  const navegue = useNavigate();
  const pathName = navigate.pathname;
  const [termoBuscado, setTermoBuscado] = useState("");
  const [itensFiltrados, setItensFiltrados] = useState([]);
  const [totalPacientes, setTotalPacientes] = useState(0);
  const [totalConsultas, setTotalConsultas] = useState(0);
  const [totalExames, setTotalExames] = useState(0);

  useEffect(() => {
    PageSetCurrentPage(pathName);
    console.log(pathName);
    async function obterTotais() {
      setTotalPacientes(
        await GetAll("pacientes").then((response) => response.length)
      );
      setTotalConsultas(
        await GetAll("consultas").then((response) => response.length)
      );
      setTotalExames(
        await GetAll("exames").then((response) => response.length)
      );
    }
    obterTotais();
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
    navegue("/editar-cadastro-paciente");
  };

  function inputDeBuscaDePaciente() {
    return (
      <>
        <label htmlFor="nomeOuId">Buscar paciente:</label>
        <input
          autoFocus
          placeholder="Nome, telefone ou email"
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
      <h1>Home</h1>
      <h2>Total de pacientes cadastrados: {totalPacientes}</h2>
      <h2>Total de consultas: {totalConsultas}</h2>
      <h2>Total de exames: {totalExames}</h2>
      {inputDeBuscaDePaciente()}
      
        <ul>
          {itensFiltrados.map((item, index) => {
            return (
              <li key={index}>
                <CardPaciente paciente={item} />
                <button onClick={() => selecaoDePaciente(item)}>
                  Ver mais
                </button>
              </li>
            );
          })}
        </ul>
     
    </>
  );
}
