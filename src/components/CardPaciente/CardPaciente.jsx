import profileIcon from '../../../Imagens/profileIcon.png'
import { calcularIdade } from '../../service/Cadastro';

export default function CardPaciente (props){
    const paciente = props.paciente;
    // const idade  = calcularIdade(paciente.dataDeNascimento);
    
    return(
        <>
        <img src={profileIcon} alt="imagem de perfil" width={50}/>
        <h4>Nome : {paciente.nome}</h4>
        <h4>Idade : {calcularIdade(paciente.dataDeNascimento)}</h4>
        <h4>Contato : {paciente.telefone}</h4>
        <h4>Plano de saúde : {paciente.convenio}</h4>
        </>
    )
}