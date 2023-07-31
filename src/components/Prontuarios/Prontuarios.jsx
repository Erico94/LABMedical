import { useState, useContext, useEffect } from "react";
import { GetAllExamesOuConsultas } from "../../service/web";
import { PacienteContext } from "../../context/PacienteContext";
import { useNavigate } from "react-router-dom";

export default function Prontuarios() {
  const [listaDeExames, setListaDeExames] = useState([]);
  const [listaDeConsultas, setListaDeConsultas] = useState([]);
  const { PacienteSelecionado } = useContext(PacienteContext);
  const navegue = useNavigate();
  const { SetConsulta } = useContext(PacienteContext);
  const { SetExame } = useContext(PacienteContext);

  useEffect(() => {
    async function ObterConsultas() {
      const data = await GetAllExamesOuConsultas(
        "consultas",
        PacienteSelecionado.id
      );
      setListaDeConsultas(data);
    }
    async function ObterExames() {
      const data = await GetAllExamesOuConsultas(
        "exames",
        PacienteSelecionado.id
      );
      setListaDeExames(data);
    }
    ObterConsultas();
    ObterExames();
  }, []);

  function EditarConsulta(item) {
    SetConsulta(item);
    navegue("/editar-consulta");
  }

  function EditarExame(item) {
    SetExame(item);
    navegue("/editar-exame");
  }

  return (
    <>
      <div className="container mt-4">
        <h3>Consultas:</h3>
        <div>
          {listaDeConsultas.map((item) => {
            return (
              <>
                <div className="container border border-secondary rounded-1 mb-2">
                  <div className="mt-1 ms-2">
                    Motivo: {item.motivoDaConsulta}
                  </div>
                  <div className="mt-1 ms-2">Data: {item.dataDaConsulta}</div>
                  <div className="mt-1 ms-2">Hora: {item.horaDaConsulta}</div>
                  <div>
                    <button
                      className="mt-1 ms-2 mb-2 btn btn-secondary transition"
                      onClick={() => EditarConsulta(item)}
                    >
                      Editar
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>

        <h3 className="mt-4">Exames:</h3>
        <div>
          {listaDeExames.map((item) => {
            return (
              <>
                <div className="container border border-secondary rounded-1 mb-2">
                  <div className="mt-1 ms-2">Nome: {item.nomeDoExame}</div>
                  <div className="mt-1 ms-2">
                    Laboratório: {item.laboratorio}
                  </div>
                  <div className="mt-1 ms-2">Data: {item.dataDoExame}</div>
                  <div className="mt-1 ms-2">Hora: {item.horaDoExame}</div>
                  <div className="mt-1 ms-2">Anexo: {item.URLdoDocumento}</div>
                  <button
                    className="mt-1 ms-2 mb-2 btn btn-secondary transition"
                    onClick={() => EditarExame(item)}
                  >
                    Editar
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
