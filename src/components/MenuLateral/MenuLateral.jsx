import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


//Esconder este menu na página de login!

export default function MenuLateral() {

  const {AuthLogout}= useContext(AuthContext);


  const handleClick = () =>{
    AuthLogout();
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li> 
          {/* aplicar funcionalidade no botão  logout */}
          <li><button onClick={handleClick}>Sair</button></li> 
          <li>
            <NavLink to="cadastro-consultas">Cadastrar consulta</NavLink>
          </li>
          <li>
            <NavLink to="cadastro-exames">Cadastrar exame</NavLink>
          </li>
          <li>
            <NavLink to="cadastro-pacientes">Cadastrar paciente</NavLink>
          </li>
          <li>
             <NavLink to="listagem-prontuarios">
              Listar prontuário
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* <h3>Usuario {usuarioLogado.nome}</h3> */}
      {/* aplicar funcionalidade nesse botão */}
      <button>Esconder menu</button>
    </>
  );
}
