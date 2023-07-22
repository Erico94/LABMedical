import { useState, useContext, useEffect } from "react";
import { GetAllExamesOuConsultas } from "../../service/web";
import { PacienteContext } from "../../context/PacienteContext";

export default function Prontuarios() {
  const [listaDeExames, setListaDeExames] = useState([]);
  const [listaDeConsultas, setListaDeConsultas] = useState([]);
  const { PacienteSelecionado } = useContext(PacienteContext);
  // const [response, setResponse] = useState(false);

  useEffect(() => {
    async function ObterConsultas() {
      const data = await GetAllExamesOuConsultas('consultas',PacienteSelecionado.id);
      setListaDeConsultas(data);
    }
    
    async function ObterExames() {
      const data = await GetAllExamesOuConsultas('exames',PacienteSelecionado.id);
      setListaDeExames(data);
    }

    ObterConsultas();
    ObterExames();
  }, []);

  return (
    <>
      <h2>Consultas:</h2>
      <ul>
          {listaDeConsultas.map((item, index) => {
            return (
              <>
              <li key={index}>
                <ul>
                  <li>Motivo: {item.motivoDaConsulta}</li>
                  <li>Data: {item.dataDaConsulta}</li>
                  <li>Hora: {item.horaDaConsulta}</li>
                </ul>
              </li>
              <li><button>Editar</button></li>
              <li></li>
              </>
            );
          })}
        </ul>


      <h2>Exames:</h2>
        <ul>
          {listaDeExames.map((item, index) => {
            return (
              <>
              <li key={index}>
                <ul>
                  <li>Nome: {item.nomeDoExame}</li>
                  <li>Laboratório: {item.laboratorio}</li>
                  <li>Data: {item.dataDoExame}</li>
                  <li>Hora: {item.horaDoExame}</li>
                  <li>Anexo: {item.URLdoDocumento}</li>
                </ul>
              </li>
              <li><button>Editar</button></li>
              <li></li>
              </>
            );
          })}
        </ul>
    </>
  );
}
