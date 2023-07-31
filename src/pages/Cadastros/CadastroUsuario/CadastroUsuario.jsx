import { useEffect, useRef, useState } from "react";
import {
  Post,
  verificaEmail,
  verificaCpf,
  verificaCrmUf,
} from "../../../service/web";
import { formatarCPF } from "../../../service/Cadastro";

export default function CadastroUsuario() {
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [errorMail, setErrorMail] = useState(false);
  const [errorCrmUf, setErrorCrmUf] = useState(false);
  const [errosCorenUf, setErrorCorenUf] = useState(false);
  const [errorCpf, setErrorCpf] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const emailRef = useRef(null);
  const crmUfRef = useRef(null);
  const corenUfRef = useRef(null);
  const passwordRef = useRef(null);
  const cpfRef = useRef(null);
  const [newUser, setNewUser] = useState({
    genero: "",
    area: "",
    nome: "",
    email: "",
    crmUf: "",
    corenUf: "",
    senha: "",
    cpf: "",
  });

  useEffect(() => {
    setErrorMail(false);
    emailRef.current.style.borderColor = "black";
  }, [newUser.email]);

  useEffect(() => {
    setErrorCrmUf(false);
    if (newUser.area === "medicina") {
      crmUfRef.current.style.borderColor = "black";
    }
  }, [newUser.crmUf]);

  useEffect(() => {
    setErrorCorenUf(false);
    if (newUser.area === "enfermagem") {
      corenUfRef.current.style.borderColor = "black";
    }
  }, [newUser.corenUf]);

  useEffect(() => {
    setErrorCpf(false);
    cpfRef.current.style.borderColor = "black";
  }, [newUser.cpf]);

  useEffect(() => {
    if (newUser.senha === passwordRepeat) {
      setErrorPassword(false);
      passwordRef.current.style.borderRadius = "2px";
      passwordRef.current.style.border = "1px solid black";
    } else {
      passwordRef.current.style.borderColor = "red";
      setErrorPassword(true);
    }
  }, [newUser.password, passwordRepeat]);

  const handleChange = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleRepeatPassword = (event) => {
    setPasswordRepeat(event.target.value);
  };

  const handleCpfChange = async (event) => {
    const cpf = event.target.value;
    const formatarCpf = formatarCPF(cpf);
    setNewUser({
      ...newUser,
      [event.target.name]: formatarCpf,
    });

    const verificarCpf = await verificaCpf("usuarios", formatarCpf);
    if (verificarCpf) {
      setErrorCpf(true);
      cpfRef.current.style.borderColor = "red";
      return;
    }
    cpfRef.current.style.borderColor = "rgb(133, 133, 133)";
    setErrorCpf(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const responseEmail = await verificaEmail(newUser.email);
    if (responseEmail) {
      emailRef.current.style.borderColor = "red";
      setErrorMail(true);
      console.log(response);
      return;
    }
    const responseCrmUf = await verificaCrmUf(newUser.crmUf);
    if (responseCrmUf) {
      crmUfRef.current.style.borderColor = "red";
      setErrorCrmUf(true);
      return;
    }
    const responseCorenUf = await verificaCrmUf(newUser.corenUf);
    if (responseCorenUf) {
      corenUfRef.current.style.borderColor = "red";
      setErrorCorenUf(true);
      return;
    }
    async function PostUser() {
      await Post("usuarios", newUser);
    }
    console.log(responseEmail);
    PostUser();
  };

  return (
    <>
      <div className="container d-flex flex-column align-items-center  mt-3 mb-3 w-50">
        <h3>Criar conta de usuário:</h3>
        <form className="w-75 border border-secondary rounded-3 px-2" onSubmit={handleSubmit}>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="genero" value={newUser.genero}>
                Gênero:
              </label>
              <label htmlFor="masculino">
                <input
                  className="ms-3"
                  required
                  type="radio"
                  id="masculino"
                  name="genero"
                  value="masculino"
                  onChange={(event) => handleChange(event)}
                />
                Masculino
              </label>
              <label htmlFor="feminino">
                <input
                  className="ms-4 form-check-input mt-0"
                  required
                  type="radio"
                  id="feminino"
                  name="genero"
                  value="feminino"
                  onChange={(event) => handleChange(event)}
                />
                Feminino
              </label>
            </div>
          </div>

          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="area" value={newUser.area}>
                Área de atuação:
              </label>
              <label htmlFor="medicina">
                <input
                  className="ms-3"
                  required
                  type="radio"
                  id="medicina"
                  name="area"
                  value="medicina"
                  onChange={(event) => handleChange(event)}
                />
                Medicina
              </label>

              <label htmlFor="enfermagem">
                <input
                  className="ms-4"
                  required
                  type="radio"
                  id="enfermagem"
                  name="area"
                  value="enfermagem"
                  onChange={(event) => handleChange(event)}
                />
                Enfermagem
              </label>
            </div>
          </div>

          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1">
              <label htmlFor="nome">Nome completo</label>
              <input
                className=" border rounded-2 form-control"
                autoFocus
                required
                type="text"
                name="nome"
                value={newUser.nome}
                onChange={(event) => handleChange(event)}
                id="nome"
              />
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1 mx-1">
              <label htmlFor="CrmUf">Crm-UF</label>
              <input
                className=" border rounded-2 form-control"
                required
                disabled={newUser.area === "medicina" ? false : true}
                type="text"
                name="crmUf"
                value={newUser.crmUf}
                ref={crmUfRef}
                id="crmUf"
                minLength={8}
                maxLength={8}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>
          {errorCrmUf && <span>Crm já cadastrado.</span>}
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1 mx-1">
              <label htmlFor="COREN-UF">Coren-UF</label>
              <input
                className="border rounded-2 form-control"
                required
                disabled={newUser.area === "enfermagem" ? false : true}
                type="text"
                name="corenUf"
                value={newUser.corenUf}
                ref={corenUfRef}
                id="corenUf"
                minLength={8}
                maxLength={8}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>
          {errorCrmUf && <span>Crm já cadastrado.</span>}

          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1 mx-1">
              <label htmlFor="email">Email</label>
              <input
                className="border rounded-2 form-control"
                required
                type="email"
                name="email"
                value={newUser.email}
                ref={emailRef}
                id="email"
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>
          {errorMail && <span>Email já cadastrado.</span>}
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1 mx-1">
              <label htmlFor="CPF">CPF</label>
              <input
                className=" border rounded-2 form-control"
                required
                type="text"
                name="cpf"
                value={newUser.cpf}
                ref={cpfRef}
                id="cpf"
                minLength={11}
                maxLength={12}
                onChange={(event) => handleCpfChange(event)}
              />
            </div>
          </div>
          {errorCpf && <span>Cpf já cadastrado.</span>}
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1 mx-1">
              <label htmlFor="senha">Senha</label>
              <input
                className=" border rounded-2 form-control"
                required
                type="password"
                value={newUser.senha}
                ref={passwordRef}
                onChange={(event) => handleChange(event)}
                name="senha"
                id="senha"
                minLength={8}
              />
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-12 mb-1 mx-1">
              <label htmlFor="passwordRepeat">Repita a senha</label>
              <input
                className="border rounded-2 form-control"
                required
                type="password"
                value={passwordRepeat}
                ref={passwordRef}
                onChange={handleRepeatPassword}
                name="passwordRepeat"
                id="passwordRepeat"
                minLength={8}
              />
            </div>
          </div>
          {errorPassword && <span>As senhas não coincidem</span>}
          <div className="col-12 mt-2 mx-1">
            <button
              className="w-100 btn btn-primary mb-3 transition"
              type="submit"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
