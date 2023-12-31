import { PagesContext } from "../../../context/PagesContext";
import { useLocation } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { filtrarPacientes, Post } from "../../../service/web";
import FormularioDeCadastroDeExame from "../../../components/FormularioExame/FormularioDeCadastroDeExame";

export default function CadastroExames() {
  const [loading, setLoading] = useState(false);
  const { PageSetCurrentPage } = useContext(PagesContext);
  const navigate = useLocation();
  const pathName = navigate.pathname;
  const [termoBuscado, setTermoBuscado] = useState("");
  const [itensFiltrados, setItensFiltrados] = useState([]);
  const [foiSelecionado, setFoiSelecionado] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState({});
  const [time, setTime] = useState("");
  const [novoExame, setNovoExame] = useState({
    nomeDoExame: "",
    dataDoExame: "",
    horaDoExame: "",
    tipoDoExame: "",
    laboratorio: "",
    URLdoDocumento: "",
    resultados: "",
    nomeDoPaciente: "",
    idDoPaciente: 0,
  });

  useEffect(() => {
    PageSetCurrentPage(pathName);
  }, []);

  useEffect(() => {
    async function FiltrarPacientes() {
      const pacientes = await filtrarPacientes(termoBuscado);
      setItensFiltrados(pacientes);
    }
    FiltrarPacientes();
  }, [termoBuscado]);

  useEffect(() => {
    const ObterHora = () => {
      const agora = new Date();
      const horaFormatada = agora.toTimeString().slice(0, 5);
      setTime(horaFormatada);
    };
    ObterHora();
    setNovoExame({
      ...novoExame,
      nomeDoPaciente: pacienteSelecionado.nome,
      idDoPaciente: pacienteSelecionado.id,
      horaDoExame: time,
    });
  }, [pacienteSelecionado]);

  const handleChangeBusca = async (event) => {
    setTermoBuscado(event.target.value);
  };

  const handleChangeExame = (event) => {
    setNovoExame({
      ...novoExame,
      [event.target.name]: event.target.value,
    });
  };

  const LimparPaciente = () => {
    setPacienteSelecionado({});
  };

  const LimparExame = () => {
    setNovoExame({
      nomeDoExame: "",
      dataDoExame: "",
      horaDoExame: "",
      tipoDoExame: "",
      laboratorio: "",
      URLdoDocumento: "",
      resultados: "",
      nomeDoPaciente: "",
      idDoPaciente: 0,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(async () => {
      await Post("exames", novoExame);
      LimparExame();
      LimparPaciente();
      setLoading(false);
      setFoiSelecionado(false);
    }, 4000);
    
  };

  const selecaoDePaciente = (paciente) => {
    setFoiSelecionado(true);
    setPacienteSelecionado(paciente);
  };

  function inputDeBuscaDePaciente() {
    return (
      <>
        <label htmlFor="nomeOuId">Nome ou id:</label>

        <div className="row border rounded-2 fs-6 mb-5">
          <input
            className="form-control"
            placeholder="Digite algo"
            autoFocus
            type="text"
            name="nomeOuId"
            id="nomeOuId"
            value={termoBuscado}
            onChange={handleChangeBusca}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row">
          {!foiSelecionado && (
            <span className="fs-3 mt-4 mb-3">
              Selecione um paciente para cadastrar um novo exame.{" "}
            </span>
          )}
        </div>
        <div className="">{!foiSelecionado && inputDeBuscaDePaciente()}</div>

        {!foiSelecionado &&
          itensFiltrados.map((item, index) => {
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
      {foiSelecionado && (
        <FormularioDeCadastroDeExame
          loading = {loading}
          novoExame={novoExame}
          paciente={pacienteSelecionado}
          handleChangeExame={handleChangeExame}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}
