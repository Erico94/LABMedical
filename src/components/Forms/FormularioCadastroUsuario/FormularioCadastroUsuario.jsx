//fazer verificação das senhas se coincidem
//salvar usuario no Json ou localStorage
//fazer o uso de useRef pra modificar cor das bordas de inputs;
//ao adicinar estilização para as boradas, atentar-se para que tornem iguais apo´s o ref se tornar false

import { useEffect, useRef, useState } from "react";
import {
  Post,
  verificaEmail,
  verificaCpf,
  verificaCrmUf,
} from "../../../service/web";

//talvez incluir telefone e endereço, fazer consulta viacep
export default function FormularioCadastroUsuario() {
  const [sexo, setSexo] = useState("");
  const [area, setArea] = useState("");
  const [email, setEmail] = useState("");
  const [crmUf, setCrmUf] = useState("");
  const [corenUf, setCorenUf] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [errorMail, setErrorMail] = useState(false);
  const [errorCrmUf, setErrorCrmUf] = useState(false);
  const [errosCorenUf,setErrorCorenUf] = useState(false);
  const [errorCpf, setErrorCpf] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const emailRef = useRef(null);
  const crmUfRef = useRef(null);
  const corenUfRef = useRef(null);
  const passwordRef = useRef(null);
  const cpfRef = useRef(null);
  const [newUser, setNewUser] = useState({
    sexo: "",
    area: "",
    nome: "",
    email: "",
    crmUf: "",
    corenUf:"",
    senha: "",
    cpf: "",
  });

  useEffect(() => {
    setErrorMail(false);
    emailRef.current.style.borderColor = "black";
  }, [setEmail]);

  useEffect(() => {
    setErrorCrmUf(false);
    if(area === 'medicina')  {crmUfRef.current.style.borderColor = "black";}
  }, [setCrmUf]);

  useEffect(() => {
    setErrorCorenUf(false);
    if(area === 'enfermagem'){
      corenUfRef.current.style.borderColor = "black";
    }
  }, [setCorenUf]);

  useEffect(() => {
    setErrorCpf(false);
    cpfRef.current.style.borderColor = "black";
  }, [setCpf]);

  useEffect(() => {
    if (password === passwordRepeat) {
      setErrorPassword(false);
      passwordRef.current.style.borderRadius = "2px";
      passwordRef.current.style.border = "1px solid black";
    } else {
      passwordRef.current.style.borderColor = "red";
      setErrorPassword(true);
    }
  }, [password, passwordRepeat]);

  const handleSexoChange = (event) => {
    setSexo(event.target.value);
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleAreaChange = (event) => {
    setArea(event.target.value);
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleCrmUfChange = (event) => {
    setCrmUf(event.target.value);
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };
  
  const handleCorenUfChange = (event) => {
    setCorenUf(event.target.value);
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleCpfChange = (event) => {
    setCpf(event.target.value);
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleRepeatPassword = (event) => {
    setPasswordRepeat(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const responseEmail = await verificaEmail(email);
    if (responseEmail) {
      emailRef.current.style.borderColor = "red";
      setErrorMail(true);
      console.log("Usuário nao pode ser cadastrado");
      return;
    }
    const responseCrmUf = await verificaCrmUf(crmUf);
    if (responseCrmUf) {
      crmUfRef.current.style.borderColor = "red";
      setErrorCrmUf(true);
      console.log("Usuário nao pode ser cadastrado");
      return;
    }
    const responseCorenUf = await verificaCrmUf(corenUf);
    if (responseCorenUf) {
      corenUfRef.current.style.borderColor = "red";
      setErrorCorenUf(true);
      console.log("Usuário nao pode ser cadastrado");
      return;
    }
    const responseCpf = await verificaCpf(cpf);
    if (responseCpf) {
      cpfRef.current.style.borderColor = "red";
      setErrorCpf(true);
      console.log("Usuário nao pode ser cadastrado");
      return;
    }
    async function PostUser() {
      await Post(newUser).then((e) =>
        console.log(`Usuário cadastrado com sucesso.`)
      );
      console.log(newUser);
    }
    PostUser();
  };

  return (
    <>
      <h1>Criar conta de usuário:</h1>
      <form onSubmit={handleSubmit}>
        
        <br />
        <label for="masculino" required>
          <input
            type="radio"
            id="masculino"
            name="sexo"
            value="masculino"
            onChange={handleSexoChange}
          />
          Masculino |
        </label>

        <label for="feminino" required>
          <input
            type="radio"
            id="feminino"
            name="sexo"
            value="feminino"
            onChange={handleSexoChange}
          />
          Feminino
        </label>

        <br />

        <label for="medicina">
          <input
            type="radio"
            id="medicina"
            name="area"
            value="medicina"
            onChange={handleAreaChange}
          />
          Medicina |
        </label>

        <label for="medicina">
          <input
            type="radio"
            id="enfermagem"
            name="area"
            value="enfermagem"
            onChange={handleAreaChange}
          />
          Enfermagem{" "}
        </label>

        <br />
        <label htmlFor="nome">Nome completo</label>
        <input
          required
          type="text"
          name="nome"
          value={nome}
          onChange={handleNameChange}
          id="nome"
        />
        <br />

        {area === 'medicina' &&<label htmlFor="CRM-UF">CRM-UF</label>}
        {area === 'medicina' && <input
          required
          type="text"
          name="crmUf"
          value={crmUf}
          ref={crmUfRef}
          id="crmUf"
          minLength={8}
          maxLength={8}
          onChange={handleCrmUfChange}
        />}
        {errorCrmUf && <span>Crm já cadastrado.</span>}
        <br />

        {area === 'enfermagem' &&<label htmlFor="COREN-UF">Coren-UF</label>}
        {area === 'enfermagem' && <input
          required
          type="text"
          name="corenUf"
          value={corenUf}
          ref={corenUfRef}
          id="corenUf"
          minLength={8}
          maxLength={8}
          onChange={handleCorenUfChange}
        />}
        {errorCrmUf && <span>Crm já cadastrado.</span>}
        <br />

        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          name="email"
          value={email}
          ref={emailRef}
          id="email"
          onChange={handleEmailChange}
        />
        {errorMail && <span>Email já cadastrado.</span>}
        <br />
        <label htmlFor="CPF">CPF</label>
        <input
          required
          type="number"
          name="cpf"
          value={cpf}
          ref={cpfRef}
          id="cpf"
          minLength={11}
          onChange={handleCpfChange}
        />
        {errorCpf && <span>Cpf já cadastrado.</span>}
        <br />
        <label htmlFor="senha">Senha</label>
        <input
          required
          type="password"
          value={password}
          ref={passwordRef}
          onChange={handlePasswordChange}
          name="senha"
          id="password"
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
