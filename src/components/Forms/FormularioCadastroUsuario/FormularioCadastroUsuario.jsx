
//fazer verificação das senhas se coincidem
//salvar usuario no Json ou localStorage
//fazer o uso de useRef pra modificar cor das bordas de inputs;

import { useState } from "react"
import { verificaSeHaCadastro } from "../../../service/web";

//talvez incluir telefone e endereço, fazer consulta viacep
export default function FormularioCadastroUsuario () {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit =async (event) =>{
        event.preventDefault();
        const response = await verificaSeHaCadastro(email);
        response ? console.log("Erro, ja existe cadastro") : console.log("Cadastro criado com sucesso");
    }

    const handleEmailChange = (event)=>{
        setEmail(event.target.value);
    }

    const handleSenhaChange = (event) =>{
        setSenha(event.target.value);
    }




    return (
        <>
        <h1>Criar conta de usuário:</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="nome">Nome completo</label>
            <input required type="text" name="nome" id="nome" />
            <br />
            <label htmlFor="email">Email</label>
            <input required type="email" value={email} onChange={handleEmailChange}/>
            <br />
            <label htmlFor="CPF">CPF</label>
            <input type="number" name="cpf" id="cpf"/>
            <br />
            <label htmlFor="senha">Senha</label>
            <input required type="password" value={senha} onChange={handleSenhaChange} name="senha" id="senha" minLength={8}/>
            <br />
            <label htmlFor="repitaSenha">Repita a senha</label>
            <input required type="password" name="repitaSenha" id="repitaSenha" minLength={8}/>
            <br />
            <button type="submit">Enviar</button>
        </form>
        </>
    )
}