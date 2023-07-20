export default function FormularioDeCadastroDeExame(novoExame, paciente, {handleChangeExame}, {handleSubmit}) {
  const handleChange = (event) => {
    handleChangeExame(event);
  };

  const CallPost = (event) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <>
      <h3>Paciente: {paciente.nome}</h3>
      <form onSubmit={CallPost}>
        <label htmlFor="nomeDoExame">Nome do exame:</label>
        <input
        type="text"
          required
          maxLength={64}
          minLength={8}
          name="nomeDoExame"
          id="nomeDoExame"
          cols="30"
          rows="4"
          value={novoExame.nomeDoExame}
          onChange={handleChange}
        ></input>
        <br />

        <label htmlFor="dataDoExame">Data do exame</label>
        <input
          required
          type="date"
          name="dataDoExame"
          id="dataDoExame"
          value={novoExame.dataDoExame}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="horaDoExame">Horário do exame</label>
        <input
          required
          type="time"
          name="horaDoExame"
          id="horaDoExame"
          value={novoExame.horaDoExame}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="tipoDoExame">Tipo do exame:</label>
        <textarea
          required
          minLength={4}
          maxLength={32}
          name="tipoDoExame"
          id="tipoDoExame"
          cols="30"
          rows="2"
          value={novoExame.tipoDoExame}
          onChange={handleChange}
        ></textarea>
        <br />

        <label htmlFor="laboratorio">Laboratório:</label>
        <input
          type="text"
          required
          name="laboratorio"
          id="laboratorio"
          maxLength={32}
          minLength={4}
          cols="30"
          rows="2"
          value={novoExame.laboratorio}
          onChange={handleChange}
        ></input>
        <br />

        <label htmlFor="URLdoDocumento">URL do documento:</label>
        <input
          type="text"
          name="URLdoDocumento"
          id="URLdoDocumento"
          value={novoExame.URLdoDocumento}
          onChange={handleChange}
        ></input>
        <br />

        <label htmlFor="resultados">Resultados:</label>
        <textarea
          required
          name="resultados"
          id="resultados"
          maxLength={1024}
          minLength={16}
          cols="30"
          rows="8"
          value={novoExame.resultados}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Salvar</button>
      </form>
    </>
  );
}
