export default function FormularioDeEdicaoDeConsulta(props) {
  const consulta = props.consulta;
  const paciente = props.paciente;
  const handleEditConsulta = props.handleEditConsulta;
  const handleSubmit = props.handleSubmit;
  const handleDeleteConsulta = props.handleDeleteConsulta;
  const handleEditar = props.handleEditar;
  const editar = props.editar;

  const HandleSubmit = (event) => {
    event.preventDefault();
    handleSubmit();
  };
  const HandleEditConsulta = (event) => {
    handleEditConsulta(event);
  };
  const HandleDeleteConsulta = () => {
    handleDeleteConsulta();
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
              disabled={editar ? true : false}
              className="btn btn-secondary"
              onClick={HandleDeleteConsulta}
            >
              Excluir
            </button>
            <button
              disabled={editar ? true : false}
              className="ms-2 btn btn-secondary"
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
              <label htmlFor="dataDaConsulta">Data: </label>
              <input
                className="ms-2 border rounded-2"
                disabled={editar ? false : true}
                required
                type="date"
                name="dataDaConsulta"
                id="dataDaConsulta"
                value={consulta.dataDaConsulta}
                onChange={HandleEditConsulta}
              />
            </div>
            <div className="col-4 mb-4 d-flex justify-content-end">
              <label htmlFor="horaDaConsulta">Hora: </label>
              <input
                className="ms-2 border rounded-2"
                disabled={editar ? false : true}
                required
                type="time"
                name="horaDaConsulta"
                id="horaDaConsulta"
                value={consulta.horaDaConsulta}
                onChange={HandleEditConsulta}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-2">
              <label htmlFor="motivoDaConsulta">Motivo da consulta:</label>
              <textarea
                className="form-control w-100"
                disabled={editar ? false : true}
                required
                maxLength={64}
                minLength={8}
                name="motivoDaConsulta"
                id="motivoDaConsulta"
                cols="30"
                rows="2"
                value={consulta.motivoDaConsulta}
                onChange={HandleEditConsulta}
              ></textarea>
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-2">
              <label htmlFor="descricaoDoProblema">Descrição do problema</label>
              <textarea
                className="form-control w-100"
                disabled={editar ? false : true}
                required
                minLength={16}
                maxLength={1024}
                name="descricaoDoProblema"
                id="descricaoDoProblema"
                cols="30"
                rows="10"
                value={consulta.descricaoDoProblema}
                onChange={HandleEditConsulta}
              ></textarea>
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-2">
              <label htmlFor="medicacaoReceitada">Medicação receitada</label>
              <textarea
                className="form-control w-100"
                disabled={editar ? false : true}
                name="medicacaoReceitada"
                id="medicacaoReceitada"
                cols="30"
                rows="2"
                value={consulta.medicacaoReceitada}
                onChange={HandleEditConsulta}
              ></textarea>
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-2">
              <label htmlFor="dosagemEprecaucoes">Dosagem e precauções</label>
              <textarea
                className="form-control w-100"
                disabled={editar ? false : true}
                required
                name="dosagemEprecaucoes"
                id="dosagemEprecaucoes"
                cols="30"
                rows="2"
                minLength={16}
                maxLength={256}
                value={consulta.dosagemEprecaucoes}
                onChange={HandleEditConsulta}
              ></textarea>
            </div>
          </div>
          <div className="col-12 mt-2">
          <button disabled={editar ? false : true} className="w-100 btn btn-primary mb-3"  type="submit">
            Salvar
          </button>
          </div>
        </form>
      </div>
    </>
  );
}
