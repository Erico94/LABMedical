        // Telefone: Obrigatório com o formato (99) 9 9999-99999
        // CPF: Obrigatório com o formato 000.000.000-00
//Criar função pra formatar inputs enquanto usuário digta - cpf/telefone
// Deverá verificar os dados informados antes de cadastrar.
// Endereço: Cep, Cidade, Estado, Logradouro, Número, Complemento, Bairro e Ponto de Referência.

import { useState } from "react";

// Deverá utilizar a API do ViaCEP para buscar os dados de endereço.

// Deverá criar um identificador único para cada paciente cadastrado.

// Deverá apresentar animação ao salvar.
export default function PaginaCadastroPaciente() {


  const [novoPaciente, setNovoPaciente] = useState({
    nome : "",
    genero : "",
    dataDeNascimento: "",
    cpf : "",
    rg : "",
    estadoCivil : "",
    telefone: "",
    email : "",
    naturalidade : "",
    contatoDeEmergencia : "",
    alergias:"",
    cuidadosEspecificos:"",
    convenio:"",
    numeroDoConvenio:"",
    validadeDoConvenio:"",
    cep:""
  })


const handleChange = (event) =>{
  setNovoPaciente({
    ...novoPaciente,
    [event.target.name] : event.target.value,
  })
}

const handleSubmit = (event) =>{
  event.preventDefault();
  console.log(novoPaciente);
}

const handleEditarUsuario = () =>{
  //edita um usuário
}

const handleApagarUsuario = () =>{
  //apaga um usuário
}


  return (
    <>
    <button onClick={handleEditarUsuario}>Editar</button>
    <button onClick={handleApagarUsuario}>Apagar</button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome completo:</label>
        <input
          required
          autoFocus
          type="text"
          name="nome"
          id="nome"
          onChange={handleChange}
          value={novoPaciente.nome}
          minLength={8}
          maxLength={64}
        />
        <br />
        <label htmlFor="genero">Gênero:</label>
        <select required name="genero" id="genero" value={novoPaciente.genero} onChange={handleChange}>
          <option value="selecione">Selecione</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
        <br />
        <label htmlFor="data-nascimento">Data de nascimento:</label>
        <input required type="date" name="dataDeNascimento" id="dataDeNascimento" value={novoPaciente.dataDeNascimento} onChange={handleChange}/>
        <br />
        <label htmlFor="cpf">CPF:</label>
        <input required type="text" minLength={11} maxLength={11} placeholder="000.000.000-00" name="cpf" id="cpf" value={novoPaciente.cpf} onChange={handleChange}/>
        <br />
        <label htmlFor="rg">RG:</label>
        <input required type="text" name="rg" id="rg" maxLength={20} value={novoPaciente.rg} onChange={handleChange}/>
        <br />
        <label htmlFor="estadoCivil">Estado civil:</label>
        <select required name="estadoCivil" id="estadoCivil" value={novoPaciente.estadoCivil} onChange={handleChange}>
            <option value="selecione">Selecione</option>
            <option value="solteiro">Solteiro</option>
            <option value="casado">Casado</option>
            <option value="divorciado">Divorciado</option>
            <option value="separado">Separado</option>
            <option value="viuvo">Viúvo</option>
        </select>
        <br />
        <label htmlFor="telefone">Telefone:</label>
        <input required type="text" id="telefone" name="telefone" minLength={11} maxLength={11} value={novoPaciente.telefone} onChange={handleChange}/>
        <br />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={novoPaciente.email} onChange={handleChange}/>
        <br />
        <label htmlFor="naturalidade">Naturalidade</label>
        <input required type="text" minLength={8} maxLength={64} name="naturalidade" id="naturalidade" value={novoPaciente.naturalidade} onChange={handleChange}/>
        <br />
        <label htmlFor="contatoDeEmergencia">Contato de emergência</label>
        <input required type="text" minLength={11} maxLength={11} name="contatoDeEmergencia" id="contatoDeEmergencia" value={novoPaciente.contatoDeEmergencia} onChange={handleChange}/>
        <br />
        <label htmlFor="alergias">Alergias</label>
        <input type="text" name="alergias" id="alergias" value={novoPaciente.alergias} onChange={handleChange}/>
        <br />
        <label htmlFor="cuidadosEspecificos">Cuidados específicos</label>
        <input type="text" name="cuidadosEspecificos" id="cuidadosEspecificos" value={novoPaciente.cuidadosEspecificos} onChange={handleChange}/>
        <br />
        <label htmlFor="convenio">Convênio</label>
        <input type="text" name="convenio" id="convenio" value={novoPaciente.convenio} onChange={handleChange}/>
        <br />
        <label htmlFor="numeroDoConvenio">Número do convênio</label>
        <input type="number" name="numeroDoConvenio" id="numeroDoConvenio" value={novoPaciente.numeroDoConvenio} onChange={handleChange}/>
        <br />
        <label htmlFor="validadeDoConvenio">Validade do convênio</label>
        <input type="date" name="validadeDoConvenio" id="validadeDoConvenio" value={novoPaciente.validadeDoConvenio} onChange={handleChange}/>
        <br />
        <label htmlFor="cep">Cep</label>
        <input type="number" name="cep" id="cep" value={novoPaciente.cep} onChange={handleChange}/>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

{/* <Form.Label>Contato de Emergência:</Form.Label>
              <Form.Control
                type="tel"
                placeholder="(99) 9 9999-9999"
                {...register("contatoEmergencia", {
                  required: true,
                  pattern: /^\(\d{2}\) \d \d{4}-\d{5}$/
                })}
              /> */}