import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { login } from "../../service/web";
import { AuthContext } from "../../context/AuthContext";

//Definir no css o pointer:cursor no elemento "esqueci minha senha"
//inserir aviso "usuaio ou senha inválidos"
export default function FormularioLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { Authlogin } = useContext(AuthContext);
  const [errorLogin, setErrorLogin] = useState(false);

  useEffect(()=>{
    setErrorLogin(false);
  },[email, senha])

  const esqueciSenha = () => {
    alert("Esta funcionalidade ainda está em desenvolvimento.");
  };

  const handleClick = () => {
    navigate("/cadastro-de-usuario");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const usuario = await login(email, senha);
    if(!usuario){
        setErrorLogin(true);
        return;
    }
    Authlogin(usuario);
    navigate("/");
  };

  return (
    <>
      <h1>Login de usuário</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
        autoFocus
          required
          type="email"
          value={email}
          onChange={handleEmailChange}
          name="email"
          id="email"
        />
        <br />
        <label htmlFor="senha">Senha</label>
        <input
          required
          type="password"
          value={senha}
          onChange={handleSenhaChange}
          name="senha"
          id="senha"
        />
        <br />
        {errorLogin && <span>Email ou senha inválidos</span>}
        <br />
        <button type="submit">Entrar</button>
      </form>
      <button onClick={handleClick}>Criar conta</button>
      <br />
      <a onClick={esqueciSenha} style={{color: 'blue', fontSize: '12px'}}>Esqueci minha senha</a>
    </>
  );
}
