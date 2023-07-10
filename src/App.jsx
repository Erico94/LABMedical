import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MenuLateral from "./components/MenuLateral/MenuLateral";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import CadastroConsultas from "./pages/Cadastros/CadastroConsultas/CadastroConsultas";
import CadastroExames from "./pages/Cadastros/CadastroExames/CadastroExames";
import CadastroPacientes from "./pages/Cadastros/CadastroPacientes/CadastroPacientes";
import ListagemProntuarios from "./pages/Prontuarios/ListagemDeProntuarios/ListagemProntuarios";
import ProntuarioPacientes from "./pages/Prontuarios/ProntuarioDePacientes/ProntuarioPacientes";
import CadastroUsuarios from "./pages/Cadastros/CadastroUsuarios/CadastroUsuarios";
import Perfil from "./pages/Perfil/Perfil";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Header from "./components/Header/Header";

function App() {
  const {isLoggedIn} = useContext(AuthContext);
  return (
    <>
      <Router>
        {isLoggedIn && <Header/>}
        {isLoggedIn && <MenuLateral />}
        <Routes>
          <Route path="/" exact element={isLoggedIn ? <Home/> : <Navigate to='/login'/> }/>
          <Route path='login' element={!isLoggedIn ? <Login/> : <Navigate to='/home'/>}/>
          <Route path='cadastro-consultas' element={isLoggedIn ? <CadastroConsultas/> : <Navigate to='/login'/> }/>
          <Route path='cadastro-exames' element={isLoggedIn ? <CadastroExames/> : <Navigate to='/login'/> }/>
          <Route path='cadastro-pacientes' element={isLoggedIn ? <CadastroPacientes/> : <Navigate to='/login'/> }/>
          <Route path='listagem-prontuarios' element={isLoggedIn ? <ListagemProntuarios/> : <Navigate to='/login'/> }/>
          <Route path='prontuario-pacientes' element={isLoggedIn ? <ProntuarioPacientes/> : <Navigate to='/login'/> }/>
          <Route path='cadastro-de-usuario' element={<CadastroUsuarios/>}/>
          <Route path='perfil-de-usuario' element={isLoggedIn ? <Perfil/> : <Navigate to='/login'/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
