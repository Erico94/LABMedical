

import { buscaCep } from "../../../service/Cep";
import { verificaCpf, Post } from "../../../service/web";
import { PagesContext } from "../../../context/PagesContext";
import { formatarCPF, formatarTelefone } from "../../../service/Cadastro";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, useContext } from "react";

export default function CadastroPaciente() {
  const navegue = useNavigate();
  const [loading, setLoading] = useState(false);
  const { PageSetCurrentPage } = useContext(PagesContext);
  const navigate = useLocation();
  const pathName = navigate.pathname;
  const [errorCep, setErrorCep] = useState(false);
  const [errorCpf, setErrorCpf] = useState(false);
  const inputRefs = useRef({});
  const [novoPaciente, setNovoPaciente] = useState({
    nome: "",
    genero: "",
    dataDeNascimento: "",
    cpf: "",
    rg: "",
    estadoCivil: "",
    telefone: "",
    email: "",
    naturalidade: "",
    contatoDeEmergencia: "",
    alergias: "",
    cuidadosEspecificos: "",
    convenio: "",
    numeroDoConvenio: "",
    validadeDoConvenio: "",
    cep: "",
    numero: "",
    complemento: "",
    logradouro: "",
    bairro: "",
    localidade: "",
    uf: "",
    pontoDeReferencia: "",
  });

  useEffect(() => {
    PageSetCurrentPage(pathName);
  }, []);

  const handleTelefoneChange = (event) => {
    const valor = event.target.value;
    const telefoneFormatado = formatarTelefone(valor);
    setNovoPaciente({
      ...novoPaciente,
      [event.target.name]: telefoneFormatado,
    });
  };

  const handleCpfChange = async (event) => {
    const cpf = event.target.value;
    const formatarCpf = formatarCPF(cpf);
    setNovoPaciente({
      ...novoPaciente,
      [event.target.name]: formatarCpf,
    });

    const verificarCpf = await verificaCpf("pacientes", formatarCpf);
    if (verificarCpf) {
      alert(` CPF ja está cadastrado`);
      setErrorCpf(true);
      inputRefs.current.cpf.style.borderColor = "red";
      return;
    }
    inputRefs.current.cpf.style.borderColor = "rgb(133, 133, 133)";
    setErrorCpf(false);
  };

  const handleChange = (event) => {
    setNovoPaciente({
      ...novoPaciente,
      [event.target.name]: event.target.value,
    });
  };

  const handleBuscaCep = async (event) => {
    event.preventDefault();
    const endereco = await buscaCep(novoPaciente.cep);
    if (!("erro" in endereco)) {
      setNovoPaciente({
        ...novoPaciente,
        logradouro: endereco.logradouro,
        bairro: endereco.bairro,
        localidade: endereco.localidade,
        uf: endereco.uf,
      });
      setErrorCep(false);
      return;
    }
    setErrorCep(true);
    setNovoPaciente({
      ...novoPaciente,
      cep: "",
      logradouro: "",
      bairro: "",
      localidade: "",
      uf: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(async() => {
      await Post("pacientes", novoPaciente);
      setLoading(false);
    }, 4000);
   
  };

  return (
    <>
      <div className="container  border border-secondary rounded-3 mt-3 mb-3 w-50">
        <form onSubmit={handleSubmit}>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="nome">Nome completo:</label>
              <input
                className="ms-2 border rounded-2"
                required
                autoFocus
                type="text"
                name="nome"
                id="nome"
                onChange={handleChange}
                value={novoPaciente.nome}
                minLength={8}
                maxLength={64}
              />
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="genero">Gênero:</label>
              <select
                className="form-select w-25 form-select-sm"
                required
                name="genero"
                id="genero"
                value={novoPaciente.genero}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="data-nascimento">Data de nascimento:</label>
              <input
                className="ms-2 border rounded-2"
                required
                type="date"
                name="dataDeNascimento"
                id="dataDeNascimento"
                value={novoPaciente.dataDeNascimento}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="cpf">CPF:</label>
              <input
                className="ms-2 border rounded-2"
                required
                type="text"
                minLength={11}
                maxLength={11}
                placeholder="000.000.000-00"
                name="cpf"
                id="cpf"
                value={novoPaciente.cpf}
                onChange={handleCpfChange}
                ref={(el) => (inputRefs.current.cpf = el)}
              />
              {errorCpf && <span>CPF já cadastrado no sistema.</span>}
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="rg">RG com órgão expeditor:</label>
              <input
                className="ms-2 border rounded-2"
                required
                type="text"
                name="rg"
                id="rg"
                maxLength={7}
                value={novoPaciente.rg}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="estadoCivil">Estado civil:</label>
              <select
                className="form-select w-25 form-select-sm"
                required
                name="estadoCivil"
                id="estadoCivil"
                value={novoPaciente.estadoCivil}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="solteiro">Solteiro</option>
                <option value="casado">Casado</option>
                <option value="divorciado">Divorciado</option>
                <option value="separado">Separado</option>
                <option value="viuvo">Viúvo</option>
              </select>
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="telefone">Telefone:</label>
              <input
                className="ms-2 border rounded-2"
                required
                type="text"
                id="telefone"
                name="telefone"
                minLength={14}
                maxLength={15}
                value={novoPaciente.telefone}
                onChange={handleTelefoneChange}
                placeholder="(xx) xxxxx-xxxx"
              />
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="email">Email</label>
              <input
                className="ms-2 border rounded-2"
                type="email"
                name="email"
                id="email"
                value={novoPaciente.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="naturalidade">Naturalidade</label>
              <input
                className="ms-2 border rounded-2"
                required
                type="text"
                minLength={8}
                maxLength={64}
                name="naturalidade"
                id="naturalidade"
                value={novoPaciente.naturalidade}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="contatoDeEmergencia">Contato de emergência</label>
              <input
                className="ms-2 border rounded-2"
                required
                type="text"
                minLength={14}
                maxLength={15}
                name="contatoDeEmergencia"
                id="contatoDeEmergencia"
                value={novoPaciente.contatoDeEmergencia}
                onChange={handleTelefoneChange}
                placeholder="(xx) xxxxx-xxxx"
              />
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="alergias">Alergias</label>
              <input
                className="ms-2 border rounded-2"
                type="text"
                name="alergias"
                id="alergias"
                value={novoPaciente.alergias}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="cuidadosEspecificos">Cuidados específicos</label>
              <input
                className="ms-2 border rounded-2"
                type="text"
                name="cuidadosEspecificos"
                id="cuidadosEspecificos"
                value={novoPaciente.cuidadosEspecificos}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="convenio">Convênio</label>
              <input
                className="ms-2 border rounded-2"
                type="text"
                name="convenio"
                id="convenio"
                value={novoPaciente.convenio}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="numeroDoConvenio">Número do convênio</label>
              <input
                className="ms-2 border rounded-2"
                type="number"
                name="numeroDoConvenio"
                id="numeroDoConvenio"
                value={novoPaciente.numeroDoConvenio}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="validadeDoConvenio">Validade do convênio</label>
              <input
                className="ms-2 border rounded-2"
                type="date"
                name="validadeDoConvenio"
                id="validadeDoConvenio"
                value={novoPaciente.validadeDoConvenio}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-10 mb-4 ">
              <label htmlFor="cep">Cep</label>
              <input
                className="ms-2 border rounded-2"
                required
                type="text"
                name="cep"
                id="cep"
                value={novoPaciente.cep}
                onChange={handleChange}
                maxLength={8}
              />
              <button
                className="w-25 h-75  d-inline-block btn btn-primary text-uppercase "
                onClick={handleBuscaCep}
              >
                Buscar cep
              </button>
            </div>
            {errorCep && <span>Insira um cep válido</span>}
          </div>
          <div className="row d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="logradouro">Rua</label>
              <input
                className="ms-2 border rounded-2"
                disabled
                type="text"
                id="logradouro"
                name="logradouro"
                value={novoPaciente.logradouro}
              />{" "}
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="bairro">Bairro</label>
              <input
                className="ms-2 border rounded-2"
                disabled
                type="text"
                id="bairro"
                name="bairro"
                value={novoPaciente.bairro}
              />{" "}
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="localidade">Cidade</label>
              <input
                className="ms-2 border rounded-2"
                disabled
                type="text"
                id="localidade"
                name="localidade"
                value={novoPaciente.localidade}
              />
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="uf">Estado</label>
              <input
                className="ms-2 border rounded-2"
                disabled
                type="text"
                id="uf"
                name="uf"
                value={novoPaciente.uf}
              />
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="numero">Número</label>
              <input
                className="ms-2 border rounded-2"
                required
                type="text"
                id="numero"
                name="numero"
                value={novoPaciente.numero}
                onChange={handleChange}
              />{" "}
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="complemento">Complemento</label>
              <input
                className="ms-2 border rounded-2"
                type="text"
                id="complemento"
                name="complemento"
                value={novoPaciente.complemento}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="pontoDeReferencia">Ponto de referência</label>
              <input
                className="ms-2 border rounded-2"
                type="text"
                id="pontoDeReferencia"
                name="pontoDeReferencia"
                value={novoPaciente.pontoDeReferencia}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-12 mt-2">
            {loading ? (
              <button class="w-100 btn btn-primary mb-3" type="button" disabled="">
                <span
                  class="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status">Loading...</span>
              </button>
            ) : (
              <button
                className="w-100 btn btn-primary mb-3 transition"
                type="submit"
              >
                Salvar
              </button>
            )}
          </div>
          <div className="container w-100 mt-3 mb-0">
            <div className="row d-flex justify-content-center">
              <div className="col-4 mb-1 d-flex flex-row-reverse">
                <button disabled className="btn btn-secondary">
                  Excluir
                </button>
                <button disabled className="me-2 btn btn-secondary">
                  Editar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
