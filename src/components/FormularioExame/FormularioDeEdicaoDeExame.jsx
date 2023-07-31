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
      <div className="container w-75 mt-3 mb-0">
        <div className="row d-flex justify-content-center">
          <div className="col-8">
            <h3>Paciente: {paciente.nome}</h3>
          </div>
          <div className="col-4 mb-1">
            <button
              className="btn btn-secondary"
              disabled={editar ? true : false}
              onClick={HandleDeleteExame}
            >
              Excluir
            </button>
            <button
              className="ms-2 btn btn-secondary"
              disabled={editar ? true : false}
              onClick={HandleEditar}
            >
              Editar
            </button>
          </div>
        </div>
      </div>

      <div className="container  border border-secondary rounded-3 mb-3 w-75">
        <form onSubmit={HandleSubmit}>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-6 mb-4">
              <label htmlFor="dataDoExame">Data do exame</label>
              <input
                className="ms-2 border rounded-2"
                disabled={editar ? false : true}
                required
                type="date"
                name="dataDoExame"
                id="dataDoExame"
                value={exame.dataDoExame}
                onChange={HandleEditExame}
              />
            </div>
            <div className="col-4 mb-4 d-flex justify-content-end">
              <label htmlFor="horaDoExame">Horário do exame</label>
              <input
                className="ms-2 border rounded-2"
                disabled={editar ? false : true}
                required
                type="time"
                name="horaDoExame"
                id="horaDoExame"
                value={exame.horaDoExame}
                onChange={HandleEditExame}
              />
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-12 mb-2">
              <label htmlFor="nomeDoExame">Nome do exame:</label>
              <input
                className="form-control w-100"
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
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-2">
              <label htmlFor="tipoDoExame">Tipo do exame:</label>
              <textarea
                className="form-control w-100"
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
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-2">
              <label htmlFor="laboratorio">Laboratório:</label>
              <input
                className="form-control w-100"
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
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-2">
              <label htmlFor="URLdoDocumento">URL do documento:</label>
              <input
                className="form-control w-100"
                disabled={editar ? false : true}
                type="text"
                name="URLdoDocumento"
                id="URLdoDocumento"
                value={exame.URLdoDocumento}
                onChange={HandleEditExame}
              ></input>
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-2">
              <label htmlFor="resultados">Resultados:</label>
              <textarea
                className="form-control w-100"
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
            </div>
          </div>
          <button disabled={editar ? false : true} className="w-100 btn btn-primary mb-3"  type="submit">
            Salvar
          </button>
        </form>
      </div>
    </>
  );
}
