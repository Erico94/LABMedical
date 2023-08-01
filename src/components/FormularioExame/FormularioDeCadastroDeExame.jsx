export default function FormularioDeCadastroDeExame(props) {
  const loading = props.loading;
  const novoExame = props.novoExame;
  const paciente = props.paciente;
  const handleChangeExame = props.handleChangeExame;
  const handleSubmit = props.handleSubmit;

  const handleChange = (event) => {
    handleChangeExame(event);
  };

  const CallPost = (event) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <>
      <div className="container w-75 mt-3 mb-0">
        <div className="row d-flex justify-content-center">
          <div className="col-8">
            <h4>Paciente: {paciente.nome}</h4>
          </div>
          <div className="col-4 mb-1 d-flex flex-row-reverse">
            <button disabled className="btn btn-secondary">
              Excluir
            </button>
            <button disabled className="me-2 btn btn-secondary">
              Editar
            </button>
          </div>
        </div>
      </div>

      <div className="container  border border-secondary rounded-3 mb-3 w-75">
        <form onSubmit={CallPost}>
          <div className="row mt-3 d-flex justify-content-between">
            <div className="col-6 mb-4">
              <label htmlFor="dataDoExame">Data:</label>
              <input
                className="ms-2 border rounded-2"
                required
                type="date"
                name="dataDoExame"
                id="dataDoExame"
                value={novoExame.dataDoExame}
                onChange={handleChange}
              />
            </div>
            <div className="col-4 mb-4 d-flex justify-content-end">
              <label htmlFor="horaDoExame">Horário:</label>
              <input
                className="ms-2 border rounded-2"
                required
                type="time"
                name="horaDoExame"
                id="horaDoExame"
                value={novoExame.horaDoExame}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-2">
              <label htmlFor="nomeDoExame">Nome do exame:</label>
              <input
                className="form-control w-100"
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
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-2">
              <label htmlFor="tipoDoExame">Tipo do exame:</label>
              <textarea
                className="form-control w-100"
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
            </div>
          </div>
          <div className="row">
            <div className="col-12 mb-2">
              <label htmlFor="laboratorio">Laboratório:</label>
              <input
                className="form-control w-100"
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
            </div>
          </div>
          <div className="row">
            <div className="col-12 mb-2">
              <label htmlFor="URLdoDocumento">URL do documento:</label>
              <input
                className="form-control w-100"
                type="text"
                name="URLdoDocumento"
                id="URLdoDocumento"
                value={novoExame.URLdoDocumento}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mb-2">
              <label htmlFor="resultados">Resultados:</label>
              <textarea
                className="form-control w-100"
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
            </div>
          </div>
          <div className="col-12 mt-2">
            {loading ? (
              <button className="w-100 btn btn-primary mb-3" type="button" disabled="">
                <span
                  class="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status">Loading...</span>
              </button>
            ) : (
              <button className="w-100 btn btn-primary mb-3" type="submit">
                Salvar
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
