import { PagesContext } from "../../../context/PagesContext";
import { useLocation } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { filtrarPacientes, Post } from "../../../service/web";
import FormularioDeCadastroDeExame from "../../../components/FormularioExame/FormularioDeCadastroDeExame";

// Talvez criar uma página de "solicitação concluida com sucesso" que aparece após algum cadastro e com botões para retornar à pagina inicial.
//apresentar animação ao salvar
//descobrir pq que as vzes não salva na primeira submissão... Já erifiquei e aparentemente parece ser um bug do json server.
export default function CadastroExames() {
  const { PageSetCurrentPage } = useContext(PagesContext);
  const navigate = useLocation();
  const pathName = navigate.pathname;
  const [termoBuscado, setTermoBuscado] = useState("");
  const [itensFiltrados, setItensFiltrados] = useState([]);
  const [foiSelecionado, setFoiSelecionado] = useState(false);
  const [pacienteSelecionado, setPacienteSelecinado] = useState({});
  const [time, setTime] = useState('');
  const [novoExame, setNovoExame] = useState({
    nomeDoExame: "",
    dataDoExame: "",
    horaDoExame: "",
    tipoDoExame: "",
    laboratorio: "",
    URLdoDocumento: "",
    resultados:"",
    nomeDoPaciente : "",
    idDoPaciente : 0,
  });

  useEffect (() => {
    PageSetCurrentPage(pathName);
    console.log(pathName);
  },[]);


  //editar
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
      setTime(horaFormatada);
    }
    ObterHora();
    setNovoExame({
      ...novoExame,
      nomeDoPaciente : pacienteSelecionado.nome,
      idDoPaciente : pacienteSelecionado.id,
      horaDoExame : time,
    })
  },[pacienteSelecionado])

  const handleChangeBusca = async (event) => {
    setTermoBuscado(event.target.value);
  };

  const handleChangeExame = (event) => {
    setNovoExame({
      ...novoExame,
      [event.target.name]: event.target.value,
    });
  };

  const LimparPaciente = () =>{
    setPacienteSelecinado({});
  }

  const LimparExame =()=>{
    setNovoExame({
      nomeDoExame: "",
      dataDoExame: "",
      horaDoExame: "",
      tipoDoExame: "",
      laboratorio: "",
      URLdoDocumento: "",
      resultados:"",
      nomeDoPaciente : "",
      idDoPaciente : 0,
    })
  }

  const handleSubmit =async () =>{
    await Post('exames', novoExame);
    console.log(novoExame);
    LimparExame();
    LimparPaciente();
    setFoiSelecionado(false);

  }

  const selecaoDePaciente = (paciente) => {
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

    return(
        <>
        <button disabled>Deletar</button>
      <button disabled>Editar</button>
      {/* {foiSelecionado && <button>Salvar</button>} */}

      {!foiSelecionado && (
        <h3>Selecione um paciente para cadastrar uma nova exame. </h3>
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
      {foiSelecionado && FormularioDeCadastroDeExame({novoExame}, pacienteSelecionado, {handleChangeExame}, {handleSubmit}) }
        </>
    )
}