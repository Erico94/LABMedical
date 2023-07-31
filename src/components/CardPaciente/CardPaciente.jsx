import profileIcon from "../../../Imagens/profileIcon.png";
import { calcularIdade } from "../../service/Cadastro";

export default function CardPaciente(props) {
  const paciente = props.paciente;

  return (
    <>
      <div className="container">
        <div className="col-12">
          <img
            src={profileIcon}
            className="mb-2"
            alt="imagem de perfil"
            width={50}
          />
        </div>
        <div className="col-12">
          <h4>{paciente.nome}</h4>
        </div>
        <div className="col-12">
          <p>{calcularIdade(paciente.dataDeNascimento)} anos</p>
        </div>
        <div className="col-12">
            <p>{paciente.telefone}</p>
        </div>
        <div className="col-12">
        <p>{paciente.convenio}</p>
        </div>
      </div>
    </>
  );
}
