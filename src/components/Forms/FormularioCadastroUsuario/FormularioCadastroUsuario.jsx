//fazer verificação das senhas se coincidem
//salvar usuario no Json ou localStorage
//fazer o uso de useRef pra modificar cor das bordas de inputs;
//ao adicinar estilização para as boradas, atentar-se para que tornem iguais apo´s o ref se tornar false

import { useEffect, useRef, useState } from "react";
import { Post, verificaSeHaCadastro } from "../../../service/web";

//talvez incluir telefone e endereço, fazer consulta viacep
export default function FormularioCadastroUsuario() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [errorMail, setErrorMail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [newUser, setNewUser] = useState({ nome: "", email: "", senha: "" });

  useEffect(() => {
    setErrorMail(false);
    emailRef.current.style.borderColor = "black";
  }, [email]);

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

  const handleSetNome = (event) => {
    setNome(event.target.value);
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
    const response = await verificaSeHaCadastro(email);
    if (response) {
      emailRef.current.style.borderColor = "red";
      setErrorMail(true);
      console.log("Usuário nao cadastrado");
      return;
    }
    async function PostUser() {
      await Post(newUser).then(e=>console.log
        (`Usuário cadastrado com sucesso.`));
        console.log(newUser);
    }
    PostUser();
  };

  return (
    <>
      <h1>Criar conta de usuário:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome completo</label>
        <input
          required
          type="text"
          name="nome"
          value={nome}
          onChange={handleSetNome}
          id="nome"
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          name="email"
          value={email}
          ref={emailRef}
          onChange={handleEmailChange}
        />
        {errorMail && <span>Email já cadastrado.</span>}
        <br />
        <label htmlFor="CPF">CPF</label>
        <input type="number" name="cpf" id="cpf" />
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
