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
      <h1>Criar conta de usuário:</h1>
      <form onSubmit={handleSubmit}>
        <br />
        <label htmlFor="genero" value={newUser.genero}>
          Gênero:
        </label>
        <label htmlFor="masculino">
          <input
            required
            type="radio"
            id="masculino"
            name="genero"
            value="masculino"
            onChange={(event) => handleChange(event)}
          />
          Masculino |
        </label>

        <label htmlFor="feminino">
          <input
            required
            type="radio"
            id="feminino"
            name="genero"
            value="feminino"
            onChange={(event) => handleChange(event)}
          />
          Feminino
        </label>
        <br />

        <label htmlFor="area" value={newUser.area}>
          Área de atuação:
        </label>
        <label htmlFor="medicina">
          <input
            required
            type="radio"
            id="medicina"
            name="area"
            value="medicina"
            onChange={(event) => handleChange(event)}
          />
          Medicina |
        </label>

        <label htmlFor="enfermagem">
          <input
            required
            type="radio"
            id="enfermagem"
            name="area"
            value="enfermagem"
            onChange={(event) => handleChange(event)}
          />
          Enfermagem
        </label>

        <br />
        <label htmlFor="nome">Nome completo</label>
        <input
          autoFocus
          required
          type="text"
          name="nome"
          value={newUser.nome}
          onChange={(event) => handleChange(event)}
          id="nome"
        />
        <br />

        <label htmlFor="CrmUf">Crm-UF</label>
        <input
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
        {errorCrmUf && <span>Crm já cadastrado.</span>}
        <br />

        <label htmlFor="COREN-UF">Coren-UF</label>
        <input
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
        {errorCrmUf && <span>Crm já cadastrado.</span>}
        <br />

        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          name="email"
          value={newUser.email}
          ref={emailRef}
          id="email"
          onChange={(event) => handleChange(event)}
        />
        {errorMail && <span>Email já cadastrado.</span>}
        <br />
        <label htmlFor="CPF">CPF</label>
        <input
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
        {errorCpf && <span>Cpf já cadastrado.</span>}
        <br />
        <label htmlFor="senha">Senha</label>
        <input
          required
          type="password"
          value={newUser.senha}
          ref={passwordRef}
          onChange={(event) => handleChange(event)}
          name="senha"
          id="senha"
          minLength={8}
        />
        <br />
        <label htmlFor="passwordRepeat">Repita a senha</label>
        <input
          required
          type="password"
          value={passwordRepeat}
          ref={passwordRef}
          onChange={handleRepeatPassword}
          name="passwordRepeat"
          id="passwordRepeat"
          minLength={8}
        />
        {errorPassword && <span>As senhas não coincidem</span>}
        <br />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}
