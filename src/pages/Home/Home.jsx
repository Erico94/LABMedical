import { PagesContext } from "../../context/PagesContext";
import { PacienteContext } from "../../context/PacienteContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { GetAll, filtrarPacientes } from "../../service/web";
import CardPaciente from "../../components/CardPaciente/CardPaciente";
import CardEstatistica from "../../components/CardEstatistica/CardEstatistica";

export default function Home() {
  const imagemPaciente = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      fill="currentColor"
      class="bi bi-people"
      viewBox="0 0 16 16"
    >
      <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
    </svg>
  );
  const imagemExame = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      fill="currentColor"
      class="bi bi-heart-pulse"
      viewBox="0 0 16 16"
    >
      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01L8 2.748ZM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5Z" />
      <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162l-1.874-4.686Z" />
    </svg>
  );
  const imagemConsulta = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      fill="currentColor"
      class="bi bi-bandaid"
      viewBox="0 0 16 16"
    >
      <path d="M14.121 1.879a3 3 0 0 0-4.242 0L8.733 3.026l4.261 4.26 1.127-1.165a3 3 0 0 0 0-4.242ZM12.293 8 8.027 3.734 3.738 8.031 8 12.293 12.293 8Zm-5.006 4.994L3.03 8.737 1.879 9.88a3 3 0 0 0 4.241 4.24l.006-.006 1.16-1.121ZM2.679 7.676l6.492-6.504a4 4 0 0 1 5.66 5.653l-1.477 1.529-5.006 5.006-1.523 1.472a4 4 0 0 1-5.653-5.66l.001-.002 1.505-1.492.001-.002Z" />
      <path d="M5.56 7.646a.5.5 0 1 1-.706.708.5.5 0 0 1 .707-.708Zm1.415-1.414a.5.5 0 1 1-.707.707.5.5 0 0 1 .707-.707ZM8.39 4.818a.5.5 0 1 1-.708.707.5.5 0 0 1 .707-.707Zm0 5.657a.5.5 0 1 1-.708.707.5.5 0 0 1 .707-.707ZM9.803 9.06a.5.5 0 1 1-.707.708.5.5 0 0 1 .707-.707Zm1.414-1.414a.5.5 0 1 1-.706.708.5.5 0 0 1 .707-.708ZM6.975 9.06a.5.5 0 1 1-.707.708.5.5 0 0 1 .707-.707ZM8.39 7.646a.5.5 0 1 1-.708.708.5.5 0 0 1 .707-.708Zm1.413-1.414a.5.5 0 1 1-.707.707.5.5 0 0 1 .707-.707Z" />
    </svg>
  );
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
        <label htmlFor="nomeOuId">Busca rápida de paciente:</label>
        <input
          className="border rounded-2 form-control"
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
      <div className="container ">
        <h5 className="mt-5 ms-4 mb-3">Estatísticas do sistema:</h5>
        <div className="row justify-content-around mb-5">
          <CardEstatistica
            imagem={imagemPaciente}
            quantidade={totalPacientes}
            nome="Pacientes"
          />

          <CardEstatistica
            imagem={imagemConsulta}
            quantidade={totalConsultas}
            nome="Consultas"
          />

          <CardEstatistica
            imagem={imagemExame}
            quantidade={totalExames}
            nome="Exames"
          />
        </div>
        <div className="row fw-bold mx-5">{inputDeBuscaDePaciente()}</div>

        <div className="row mb-5" style={{ justifyContent: "space-evenly" }}>
          {itensFiltrados.map((item) => {
            return (
              <div className="text-center col-3 border border-primary border-1 rounded-3 shadow bg-body-tertiary transition mt-1 p-3 mx-4 mt-3">
                <CardPaciente paciente={item} />
                <button
                  className="btn btn-info"
                  onClick={() => selecaoDePaciente(item)}
                >
                  Ver cadastro
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
