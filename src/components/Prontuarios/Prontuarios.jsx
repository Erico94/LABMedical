import { useState, useContext, useEffect } from "react";
import { GetAllExamesOuConsultas } from "../../service/web";
import { PacienteContext } from "../../context/PacienteContext";
import { useNavigate } from "react-router-dom";

export default function Prontuarios() {
  const [listaDeExames, setListaDeExames] = useState([]);
  const [listaDeConsultas, setListaDeConsultas] = useState([]);
  const { PacienteSelecionado } = useContext(PacienteContext);
  const navegue = useNavigate();
  const {SetConsulta} = useContext(PacienteContext);
  const {SetExame} = useContext(PacienteContext);

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

  function EditarConsulta (item){
    SetConsulta(item);
    navegue('/editar-consulta');
  }

  function EditarExame (item){
    SetExame(item);
    navegue('/editar-exame');
  }

  return (
    <>
      <h2>Consultas:</h2>
      <ul>
          {listaDeConsultas.map((item, index) => {
            return (
              <>
              <li key={index}>
                <ul>
                  <li key={item.motivoDaConsulta}>Motivo: {item.motivoDaConsulta}</li>
                  <li key={item.dataDaConsulta}>Data: {item.dataDaConsulta}</li>
                  <li key={item.horaDaConsulta}>Hora: {item.horaDaConsulta}</li>
                </ul>
              </li>
              <li><button onClick={()=>EditarConsulta(item)}>Editar</button></li>
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
              <li><button onClick={()=>EditarExame(item)}>Editar</button></li>
              <li></li>
              </>
            );
          })}
        </ul>
    </>
  );
}
