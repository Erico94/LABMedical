import { useContext } from "react";
import { NavLink} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./styles.css";

//Esconder este menu na página de login!

export default function MenuLateral() {
  const { AuthLogout } = useContext(AuthContext);

  const handleClick = () => {
    AuthLogout();
  };

  return (
    <div className="menu-lateral">
      <nav>
        <ul>
          <li>
            <button onClick={handleClick}>Sair</button>
          </li>
          <li>
            <NavLink to="/">Início</NavLink>
          </li>
          <li>
            <NavLink to="cadastro-consulta">Cadastrar consulta</NavLink>
          </li>
          <li>
            <NavLink to="cadastro-exame">Cadastrar exame</NavLink>
          </li>
          <li>
            <NavLink to="cadastro-paciente">Cadastrar paciente</NavLink>
          </li>
          <li>
            <NavLink to="prontuarios">Prontuários</NavLink>
          </li>
        </ul>
      </nav>
      {/* <h3>Usuario {usuarioLogado.nome}</h3> */}
      {/* aplicar funcionalidade nesse botão */}
      <button>Esconder menu</button>
    </div>
  );
}
