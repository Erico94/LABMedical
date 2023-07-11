import { useContext } from "react";
import { useLocation} from "react-router-dom"
import { AuthContext } from "../../../context/AuthContext";
import profileIcon from "../../../../Imagens/profileIcon.png"
import "./styles.css"
import { PagesContext } from "../../../context/PagesContext";

// titulo da pagina atual
// opcional botao de sair e dropdown
export default function Toolbar(){
    const {usuarioLogado}= useContext(AuthContext);
    const {currentPage} = useContext(PagesContext);
    const navigate = useLocation();

    const handleProfile = ()=>{
        navigate ('/perfil-de-usuario')
    }
    return(
        <div className="toolbar">
        <h3>{currentPage}</h3>
        <h4>Bem vindo usuário {usuarioLogado.nome}</h4>
        <a onClick={handleProfile}> <img src={profileIcon} alt="imagem de perfil do usuario" className="imagem-perfil" /> </a>
        </div>
    )
}