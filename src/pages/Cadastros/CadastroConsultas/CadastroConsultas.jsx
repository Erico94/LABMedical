import { PagesContext } from "../../../context/PagesContext";
import { useLocation } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { filtrarPacientes, Post } from "../../../service/web";
import FormularioDeCadastroDeConsulta from "../../../components/FormularioConsulta/FormularioDeCadastroDeConsulta";



//apresentar animação ao salvar
//descobrir pq que as vzes não salva na primeira submissão
export default function CadastroConsultas() {
  const { PageSetCurrentPage } = useContext(PagesContext);
  const navigate = useLocation();
  const pathName = navigate.pathname;
  const [termoBuscado, setTermoBuscado] = useState("");
  const [itensFiltrados, setItensFiltrados] = useState([]);
  const [foiSelecionado, setFoiSelecionado] = useState(false);
  const [pacienteSelecionado, setPacienteSelecinado] = useState({});
  const [time, setTime] = useState('');
  const [novaConsulta, setNovaConsulta] = useState({
    motivoDaConsulta: "",
    dataDaConsulta: "",
    horaDaConsulta: "",
    descricaoDoProblema: "",
    medicacaoReceitada: "",
    dosagemEprecaucoes: "",
    nomeDoPaciente : "",
    idDoPaciente : 0,
  });

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

  useEffect(() =>{
    const ObterHora = ()=>{
      const agora = new Date();
      const horaFormatada = agora.toTimeString().slice(0,5);
      console.log(horaFormatada);
      setTime(horaFormatada);
    }
    ObterHora();
    console.log(time);
    setNovaConsulta({
      ...novaConsulta,
      nomeDoPaciente : pacienteSelecionado.nome,
      idDoPaciente : pacienteSelecionado.id,
      horaDaConsulta : time,
    })
  },[pacienteSelecionado])

  const handleChangeBusca = async (event) => {
    setTermoBuscado(event.target.value);
  };

  const handleChangeConsulta = (event) => {
    setNovaConsulta({
      ...novaConsulta,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit =async () =>{
    console.log(pacienteSelecionado.nome);
    await Post('consultas', novaConsulta);

  }

  const selecaoDePaciente = (paciente) => {
    console.log("deu certo");
    console.log(paciente);
    setFoiSelecionado(true);
    setPacienteSelecinado(paciente);
  };


  function inputDeBuscaDePaciente() {
    return (
      <>
        <label htmlFor="nomeOuId">Nome ou id:</label>
        <input
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
      <button disabled>Deletar</button>
      <button disabled>Editar</button>
      {/* {foiSelecionado && <button>Salvar</button>} */}

      {!foiSelecionado && (
        <h3>Selecione um paciente para cadastrar uma nova consulta. </h3>
      )}
      {!foiSelecionado && inputDeBuscaDePaciente()}
      <br />

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
      {/* {foiSelecionado && <FormularioDeCadastroDeConsulta paciente = {pacienteSelecionado} novaConsulta={novaConsulta} handleChangeConsulta ={handleChangeConsulta}/>} */}
      {foiSelecionado && FormularioDeCadastroDeConsulta({novaConsulta}, pacienteSelecionado, {handleChangeConsulta}, {handleSubmit}) }
    </>
  );
}
