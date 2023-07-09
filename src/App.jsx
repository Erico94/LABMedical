import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MenuLateral from "./components/MenuLateral/MenuLateral";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import CadastroConsultas from "./pages/Cadastros/CadastroConsultas/CadastroConsultas";
import CadastroExames from "./pages/Cadastros/CadastroExames/CadastroExames";
import CadastroPacientes from "./pages/Cadastros/CadastroPacientes/CadastroPacientes";
import ListagemProntuarios from "./pages/Prontuarios/ListagemDeProntuarios/ListagemProntuarios";
import ProntuarioPacientes from "./pages/Prontuarios/ProntuarioDePacientes/ProntuarioPacientes";
import FormularioLogin from "./components/Forms/FormularioLogin/FormularioLogin";
import FormularioCadastroUsuario from "./components/Forms/FormularioCadastroUsuario/FormularioCadastroUsuario";
import CadastroUsuarios from "./pages/Cadastros/CadastroUsuarios/CadastroUsuarios";
import { useCallback, useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {isLoggedIn} = useContext(AuthContext);

  return (
    <>
      <Router>
        <MenuLateral />
        <Routes>
          <Route path="/" exact element={isLoggedIn ? <Home/> : <Login/> }/>
          <Route path='login' element={<Login/>}></Route>
          <Route path='cadastro-consultas' element={<CadastroConsultas/>}></Route>
          <Route path='cadastro-exames' element={<CadastroExames/>}></Route>
          <Route path='cadastro-pacientes' element={<CadastroPacientes/>}></Route>
          <Route path='listagem-prontuarios' element={<ListagemProntuarios/>}></Route>
          <Route path='prontuario-pacientes' element={<ProntuarioPacientes/>}></Route>
          <Route path='cadastro-de-usuario' element={<CadastroUsuarios/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
