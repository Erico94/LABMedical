export default function FormularioDeEdicaoDeExame(props) {
  const exame = props.exame;
  const paciente = props.paciente;
  const handleEditExame = props.handleEditExame;
  const handleSubmit = props.handleSubmit;
  const handleDeleteExame = props.handleDeleteExame;
  const handleEditar = props.handleEditar;
  const editar = props.editar;

  const HandleSubmit = (event) => {
    event.preventDefault();
    handleSubmit();
  };
  const HandleEditExame = (event) => {
    handleEditExame(event);
  };
  const HandleDeleteExame = () => {
    handleDeleteExame();
  };
  const HandleEditar = () => {
    handleEditar();
  };
  return (
    <>
      <h3>Paciente: {paciente.nome}</h3>
      <form onSubmit={HandleSubmit}>
        <label htmlFor="nomeDoExame">Nome do exame:</label>
        <input
          disabled={editar ? false : true}
          type="text"
          required
          maxLength={64}
          minLength={8}
          name="nomeDoExame"
          id="nomeDoExame"
          cols="30"
          rows="4"
          value={exame.nomeDoExame}
          onChange={HandleEditExame}
        ></input>
        <br />

        <label htmlFor="dataDoExame">Data do exame</label>
        <input
          disabled={editar ? false : true}
          required
          type="date"
          name="dataDoExame"
          id="dataDoExame"
          value={exame.dataDoExame}
          onChange={HandleEditExame}
        />
        <br />

        <label htmlFor="horaDoExame">Horário do exame</label>
        <input
          disabled={editar ? false : true}
          required
          type="time"
          name="horaDoExame"
          id="horaDoExame"
          value={exame.horaDoExame}
          onChange={HandleEditExame}
        />
        <br />

        <label htmlFor="tipoDoExame">Tipo do exame:</label>
        <textarea
          disabled={editar ? false : true}
          required
          minLength={4}
          maxLength={32}
          name="tipoDoExame"
          id="tipoDoExame"
          cols="30"
          rows="2"
          value={exame.tipoDoExame}
          onChange={HandleEditExame}
        ></textarea>
        <br />

        <label htmlFor="laboratorio">Laboratório:</label>
        <input
          disabled={editar ? false : true}
          type="text"
          required
          name="laboratorio"
          id="laboratorio"
          maxLength={32}
          minLength={4}
          cols="30"
          rows="2"
          value={exame.laboratorio}
          onChange={HandleEditExame}
        ></input>
        <br />

        <label htmlFor="URLdoDocumento">URL do documento:</label>
        <input
          disabled={editar ? false : true}
          type="text"
          name="URLdoDocumento"
          id="URLdoDocumento"
          value={exame.URLdoDocumento}
          onChange={HandleEditExame}
        ></input>
        <br />

        <label htmlFor="resultados">Resultados:</label>
        <textarea
          disabled={editar ? false : true}
          required
          name="resultados"
          id="resultados"
          maxLength={1024}
          minLength={16}
          cols="30"
          rows="8"
          value={exame.resultados}
          onChange={HandleEditExame}
        ></textarea>
        <button disabled={editar ? false : true} type="submit">Salvar</button>
      </form>
      <button disabled={editar ? true : false} onClick={HandleDeleteExame}>Excluir</button>
      <button disabled={editar ? true : false} onClick={HandleEditar}>Editar</button>
    </>
  );
}
