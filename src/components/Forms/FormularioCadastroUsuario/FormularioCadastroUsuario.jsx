
//fazer verificação das senhas se coincidem
//salvar usuario noJson ou localStorage
//talvez incluir telefone e endereço, fazer consulta viacep
export default function FormularioCadastroUsuario () {

    

    return (
        <>
        <h1>Criar conta de usuário:</h1>
        <form>
            <label htmlFor="nome">Nome completo</label>
            <input required type="text" name="nome" id="nome" />
            <br />
            <label htmlFor="email">Email</label>
            <input required type="email"/>
            <br />
            <label htmlFor="CPF">CPF</label>
            <input type="number" name="cpf" id="cpf"/>
            <br />
            <label htmlFor="senha">Senha</label>
            <input type="password" name="senha" id="senha" minLength={8}/>
            <br />
            <label htmlFor="repitaSenha">Repita a senha</label>
            <input type="password" name="repitaSenha" id="repitaSenha" minLength={8}/>
            <br />
            <button type="submit">Enviar</button>
        </form>
        </>
    )
}