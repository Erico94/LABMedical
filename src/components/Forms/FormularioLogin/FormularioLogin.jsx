import { useNavigate } from "react-router-dom";
import FormularioCadastroUsuario from "../FormularioCadastroUsuario/FormularioCadastroUsuario";
import { useContext, useState } from "react";
import { login } from "../../../service/web";
import { AuthContext } from "../../../context/AuthContext";

//Se usuário não existir, incentivar a criar conta
//Definir no css o pointer:cursor no elemento "esqueci minha senha"
//O botão de entrar deve direcionar o usuário para a página de Início, caso o e-mail e senha sejam válidos e estejam cadastrados.
export default function FormularioLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { Authlogin } = useContext(AuthContext);

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

  //Aqui devo terminar ainda
  const handleSubmit = async (event) => {
    event.preventDefault();

    const usuario = await login(email, senha);
    if(!usuario){
        console.log("Dados inválidos");
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
        <button type="submit">Entrar</button>
      </form>
      <button onClick={handleClick}>Criar conta</button>
      <br />
      <a onClick={esqueciSenha}>Esqueci minha senha</a>
      <a href="#">Resetar senha</a>
    </>
  );
}
