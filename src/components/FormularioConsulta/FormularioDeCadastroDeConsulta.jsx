export default function FormularioDeCadastroDeConsulta(
  novaConsulta,
  paciente,
  { handleChangeConsulta },
  { handleSubmit }
) {
  const handleChange = (event) => {
    handleChangeConsulta(event);
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
              <label htmlFor="dataDaConsulta">Data: </label>
              <input
                className="ms-2 border rounded-2"
                required
                type="date"
                name="dataDaConsulta"
                id="dataDaConsulta"
                value={novaConsulta.dataDaConsulta}
                onChange={handleChange}
              />
            </div>
            <div className="col-4 mb-4 d-flex justify-content-end">
              <label htmlFor="horaDaConsulta">Hora: </label>
              <input
                className="ms-2 border rounded-2"
                required
                type="time"
                name="horaDaConsulta"
                id="horaDaConsulta"
                value={novaConsulta.horaDaConsulta}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-2">
              <label htmlFor="motivoDaConsulta">Motivo da consulta:</label>
              <textarea
                className="form-control w-100"
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
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-2">
              <label htmlFor="descricaoDoProblema">
                Descrição do problema:
              </label>
              <textarea
                className="form-control w-100"
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
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-2">
              <label htmlFor="medicacaoReceitada">Medicação receitada:</label>
              <textarea
                className="form-control w-100"
                name="medicacaoReceitada"
                id="medicacaoReceitada"
                cols="30"
                rows="2"
                value={novaConsulta.medicacaoReceitada}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="row">
            <div className="col-12 mb-2">
              <label htmlFor="dosagemEprecaucoes">Dosagem e precauções:</label>
              <textarea
                className="form-control w-100"
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
            </div>
          </div>
          <div className="col-12 mt-2">
            <button className="w-100 btn btn-primary mb-3" type="submit">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
