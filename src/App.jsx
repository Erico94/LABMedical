import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MenuLateral from "./components/MenuLateral/MenuLateral";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import CadastroConsultas from "./pages/Cadastros/CadastroConsultas/CadastroConsultas";
import CadastroExames from "./pages/Cadastros/CadastroExames/CadastroExames";
import CadastroPaciente from "./pages/Cadastros/CadastroPacientes/CadastroPaciente";
import ListagemProntuarios from "./pages/Prontuarios/ListagemDeProntuarios/ListagemProntuarios";
import ProntuarioPaciente from "./pages/Prontuarios/ProntuarioDePacientes/ProntuarioPaciente";
import CadastroUsuario from "./pages/Cadastros/CadastroUsuario/CadastroUsuario";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Header from "./components/Header/Header";
import EditarConsulta from "./pages/Consulta/EditarConsulta";
import EditarExame from "./pages/Exame/EditarExame";
import EditarPaciente from "./pages/Paciente/EditarPaciente";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <Router>
        <div className="sideBar">{isLoggedIn && <MenuLateral />}</div>
        <div className="container">
          <div className="row  mt-4">
            <div className="col-12">{isLoggedIn && <Header />}</div>
          </div>
        </div>

        <Routes>
          <Route
            path="/"
            exact
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="login"
            element={!isLoggedIn ? <Login /> : <Navigate to="/home" />}
          />
          <Route
            path="cadastro-consulta"
            element={
              isLoggedIn ? <CadastroConsultas /> : <Navigate to="/login" />
            }
          />
          <Route
            path="cadastro-exame"
            element={isLoggedIn ? <CadastroExames /> : <Navigate to="/login" />}
          />
          <Route
            path="cadastro-paciente"
            element={
              isLoggedIn ? <CadastroPaciente /> : <Navigate to="/login" />
            }
          />
          <Route
            path="prontuarios"
            element={
              isLoggedIn ? <ListagemProntuarios /> : <Navigate to="/login" />
            }
          />
          <Route
            path="prontuario-paciente"
            element={
              isLoggedIn ? <ProntuarioPaciente /> : <Navigate to="/login" />
            }
          />
          <Route
            path="cadastro-de-usuario"
            element={!isLoggedIn ? <CadastroUsuario /> : <Navigate to="/" />}
          />
          <Route
            path="editar-consulta"
            element={isLoggedIn ? <EditarConsulta /> : <Navigate to="/login" />}
          />
          <Route
            path="editar-exame"
            element={isLoggedIn ? <EditarExame /> : <Navigate to="/login" />}
          />
          <Route
            path="editar-cadastro-paciente"
            element={isLoggedIn ? <EditarPaciente /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
