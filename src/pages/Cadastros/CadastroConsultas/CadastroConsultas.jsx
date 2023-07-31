import { PagesContext } from "../../../context/PagesContext";
import { useLocation } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { filtrarPacientes, Post } from "../../../service/web";
import FormularioDeCadastroDeConsulta from "../../../components/FormularioConsulta/FormularioDeCadastroDeConsulta";


export default function CadastroConsultas() {
  const [loading, setLoading] = useState(false);
  const { PageSetCurrentPage } = useContext(PagesContext);
  const navigate = useLocation();
  const pathName = navigate.pathname;
  const [termoBuscado, setTermoBuscado] = useState("");
  const [itensFiltrados, setItensFiltrados] = useState([]);
  const [foiSelecionado, setFoiSelecionado] = useState(false);
  const [pacienteSelecionado, setPacienteSelecinado] = useState({});
  const [time, setTime] = useState("");
  const [novaConsulta, setNovaConsulta] = useState({
    motivoDaConsulta: "",
    dataDaConsulta: "",
    horaDaConsulta: "",
    descricaoDoProblema: "",
    medicacaoReceitada: "",
    dosagemEprecaucoes: "",
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
    setNovaConsulta({
      ...novaConsulta,
      nomeDoPaciente: pacienteSelecionado.nome,
      idDoPaciente: pacienteSelecionado.id,
      horaDaConsulta: time,
    });
  }, [pacienteSelecionado]);

  const handleChangeBusca = async (event) => {
    setTermoBuscado(event.target.value);
  };

  const handleChangeConsulta = (event) => {
    setNovaConsulta({
      ...novaConsulta,
      [event.target.name]: event.target.value,
    });
  };

  const LimparPaciente = () => {
    setPacienteSelecinado({});
  };

  const LimparConsulta = () => {
    setNovaConsulta({
      motivoDaConsulta: "",
      dataDaConsulta: "",
      horaDaConsulta: "",
      descricaoDoProblema: "",
      medicacaoReceitada: "",
      dosagemEprecaucoes: "",
      nomeDoPaciente: "",
      idDoPaciente: 0,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(async() => {
      await Post("consultas", novaConsulta);
      LimparConsulta();
      LimparPaciente();
      setFoiSelecionado(false);
      setLoading(false);
    }, 3000);
  };

  const selecaoDePaciente = (paciente) => {
    setFoiSelecionado(true);
    setPacienteSelecinado(paciente);
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
        <div className="row mt-5">
          {!foiSelecionado && (
            <span className="fs-4 mb-3">
              Selecione um paciente para cadastrar uma nova consulta.{" "}
            </span>
          )}
        </div>
        <div className="">{!foiSelecionado && inputDeBuscaDePaciente()}</div>
        {!foiSelecionado &&
          itensFiltrados.map((item) => {
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
        <FormularioDeCadastroDeConsulta
          novaConsulta={novaConsulta}
          paciente={pacienteSelecionado}
          loading={loading}
          handleChangeConsulta={handleChangeConsulta}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}
