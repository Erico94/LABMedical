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
      <h3>Paciente: {paciente.nome}</h3>
      <form onSubmit={HandleSubmit}>
        <label htmlFor="motivoDaConsulta">Motivo da consulta:</label>
        <textarea
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
        <br />

        <label htmlFor="dataDaConsulta">Data da consulta</label>
        <input
          disabled={editar ? false : true}
          required
          type="date"
          name="dataDaConsulta"
          id="dataDaConsulta"
          value={consulta.dataDaConsulta}
          onChange={HandleEditConsulta}
        />
        <br />

        <label htmlFor="horaDaConsulta">Horário da consulta</label>
        <input
          disabled={editar ? false : true}
          required
          type="time"
          name="horaDaConsulta"
          id="horaDaConsulta"
          value={consulta.horaDaConsulta}
          onChange={HandleEditConsulta}
        />
        <br />

        <label htmlFor="descricaoDoProblema">Descrição do problema</label>
        <textarea
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
        <br />

        <label htmlFor="medicacaoReceitada">Medicação receitada</label>
        <textarea
          disabled={editar ? false : true}
          name="medicacaoReceitada"
          id="medicacaoReceitada"
          cols="30"
          rows="2"
          value={consulta.medicacaoReceitada}
          onChange={HandleEditConsulta}
        ></textarea>
        <br />

        <label htmlFor="dosagemEprecaucoes">Dosagem e precauções</label>
        <textarea
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
        <br />
        <button disabled={editar ? false : true} type="submit">
          Salvar
        </button>
      </form>
      <button disabled={editar ? true : false} onClick={HandleDeleteConsulta}>
        Excluir
      </button>
      <button disabled={editar ? true : false} onClick={HandleEditar}>
        Editar
      </button>
    </>
  );
}
