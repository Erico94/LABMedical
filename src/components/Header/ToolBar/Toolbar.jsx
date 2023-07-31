import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import profileIcon from "../../../../Imagens/profileIcon.png";
import "./styles.css";
import { PagesContext } from "../../../context/PagesContext";

// titulo da pagina atual
// opcional botao de sair e dropdown
export default function Toolbar() {
  const { usuarioLogado } = useContext(AuthContext);
  const { currentPage } = useContext(PagesContext);
  return (
    <div className="container border rounded-3 p-3 toolbar">
      <div className="row">
        <div className="col-6 ps-5 d-flex align-items-center text-light">
          <span className="fs-3 fw-bold text-uppercase">{currentPage}</span>
        </div>
        <div className="col-6 d-flex justify-content-end align-items-center pe-5 text-light">
          <h4 className="nome">{usuarioLogado.nome}</h4>
          <img
            src={profileIcon}
            alt="imagem de perfil do usuario"
            className="imagem-perfil"
          />
        </div>
      </div>
    </div>
  );
}
