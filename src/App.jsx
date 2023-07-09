import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MenuLateral from "./components/MenuLateral/MenuLateral";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import CadastroConsultas from "./pages/Cadastros/CadastroConsultas/CadastroConsultas";
import CadastroExames from "./pages/Cadastros/CadastroExames/CadastroExames";
import CadastroPacientes from "./pages/Cadastros/CadastroPacientes/CadastroPacientes";
import ListagemProntuarios from "./pages/Prontuarios/ListagemDeProntuarios/ListagemProntuarios";
import ProntuarioPacientes from "./pages/Prontuarios/ProntuarioDePacientes/ProntuarioPacientes";

function App() {
  return (
    <>
      <Router>
        <MenuLateral />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path='login' element={<Login/>}></Route>
          <Route path='cadastro-consultas' element={<CadastroConsultas/>}></Route>
          <Route path='cadastro-exames' element={<CadastroExames/>}></Route>
          <Route path='cadastro-pacientes' element={<CadastroPacientes/>}></Route>
          <Route path='listagem-prontuarios' element={<ListagemProntuarios/>}></Route>
          <Route path='prontuario-pacientes' element={<ProntuarioPacientes/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
