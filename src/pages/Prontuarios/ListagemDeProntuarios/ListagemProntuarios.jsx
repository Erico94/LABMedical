import { PagesContext } from "../../../context/PagesContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { filtrarPacientes } from "../../../service/web";
import { PacienteContext } from "../../../context/PacienteContext";

export default function ListagemProntuarios() {
  const { PageSetCurrentPage } = useContext(PagesContext);
  const { SetPaciente } = useContext(PacienteContext);
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
    navegue("/prontuario-paciente");
  };

  function inputDeBuscaDePaciente() {
    return (
      <>
        <label htmlFor="nomeOuId">Nome ou id:</label>

        <div className="row border rounded-2 fs-6 mb-5">
          <input
            className="form-control"
            autoFocus
            type="text"
            name="nomeOuId"
            id="nomeOuId"
            value={termoBuscado}
            onChange={handleChangeBusca}
            placeholder="Digite algo"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <span className="fs-3 mt-4 mb-3">
            Selecione um paciente para ver prontuário.
          </span>
        </div>
        <div>{inputDeBuscaDePaciente()}</div>

        {itensFiltrados.map((item) => {
          return (
            <div
              className="row transition cursor-pointer border border-primary rounded-2 fs-4 my-2 p-2 "
              style={{ height: "60px" }}
              onClick={() => selecaoDePaciente(item)}
            >
              {item.nome}
            </div>
          );
        })}
      </div>
    </>
  );
}
