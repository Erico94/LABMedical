import { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../context/AuthContext";
import profileIcon from "../../../../Imagens/profileIcon.png"
import "./styles.css"

// titulo da pagina atual
// opcional botao de sair e dropdown
//Mostrar em TODAS AS PAGINAS EXCETO NA DE LOGIN
export default function Toolbar(){
    const {pagina} = useParams();
    const {usuarioLogado}= useContext(AuthContext);
    const navigate = useNavigate();

    const handleProfile = ()=>{
        navigate ('/perfil-de-usuario')
    }
    return(
        <div className="toolbar">
        <h3>Página atual {pagina}</h3>
        <h4>Bem vindo usuário {usuarioLogado.nome}</h4>
        <a onClick={handleProfile}> <img src={profileIcon} alt="imagem de perfil do usuario" className="imagem-perfil" /> </a>
        </div>
    )
}