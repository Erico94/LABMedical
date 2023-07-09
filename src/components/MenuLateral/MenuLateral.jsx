import { NavLink } from "react-router-dom";

export default function MenuLateral() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li> 
           <li>
            <NavLink to="login">Login</NavLink>
          </li> 
          <li>
            <NavLink to="cadastro-consultas">Cadastro de consultas</NavLink>
          </li>
          <li>
            <NavLink to="cadastro-exames">Cadastro de exames</NavLink>
          </li>
          <li>
            <NavLink to="cadastro-pacientes">Cadastro de pacientes</NavLink>
          </li>
          <li>
             <NavLink to="listagem-prontuarios">
              Listagem de prontuários
            </NavLink>
          </li>
          <li>
            <NavLink to="prontuario-pacientes">Prontuário de paciente</NavLink>
          </li>
          <h2>Menu lateral</h2>
        </ul>
      </nav>
    </>
  );
}
