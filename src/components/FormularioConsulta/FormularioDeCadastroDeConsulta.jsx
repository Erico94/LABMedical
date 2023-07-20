import { useState } from "react";

export default function FormularioDeCadastroDeConsulta(novaConsulta, paciente, {handleChangeConsulta}, {handleSubmit}) {
  
    const handleChange = (event) =>{
        handleChangeConsulta(event);
    }

    const CallPost = (event) =>{
        event.preventDefault();
        handleSubmit();
    }

  return (
    <>
      <h3>Paciente: {paciente.nome}</h3>
      <form onSubmit={CallPost}>
        <label htmlFor="motivoDaConsulta">Motivo da consulta:</label>
        <textarea
          required
          maxLength={64}
          minLength={8}
          name="motivoDaConsulta"
          id="motivoDaConsulta"
          cols="30"
          rows="2"
          value={novaConsulta.motivoDaConsulta}
          onChange={handleChange}
          
        ></textarea>
        <br />

        <label htmlFor="dataDaConsulta">Data da consulta</label>
        <input
          required
          type="date"
          name="dataDaConsulta"
          id="dataDaConsulta"
          value={novaConsulta.dataDaConsulta}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="horaDaConsulta">Horário da consulta</label>
        <input
          required
          type="time"
          name="horaDaConsulta"
          id="horaDaConsulta"
          value={novaConsulta.horaDaConsulta}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="descricaoDoProblema">Descrição do problema</label>
        <textarea
          required
          minLength={16}
          maxLength={1024}
          name="descricaoDoProblema"
          id="descricaoDoProblema"
          cols="30"
          rows="10"
          value={novaConsulta.descricaoDoProblema}
          onChange={handleChange}
        ></textarea>
        <br />

        <label htmlFor="medicacaoReceitada">Medicação receitada</label>
        <textarea
          name="medicacaoReceitada"
          id="medicacaoReceitada"
          cols="30"
          rows="2"
          value={novaConsulta.medicacaoReceitada}
          onChange={handleChange}
        ></textarea>
        <br />

        <label htmlFor="dosagemEprecaucoes">Dosagem e precauções</label>
        <textarea
          required
          name="dosagemEprecaucoes"
          id="dosagemEprecaucoes"
          cols="30"
          rows="2"
          minLength={16}
          maxLength={256}
          value={novaConsulta.dosagemEprecaucoes}
          onChange={handleChange}
        ></textarea>
        <br />
        <button type="submit">Salvar</button>
      </form>
    </>
  );
}
