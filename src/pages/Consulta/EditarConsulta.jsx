import { PacienteContext } from "../../context/PacienteContext";
import { PagesContext } from "../../context/PagesContext";
import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Put } from "../../service/web";
import FormularioDeEdicaoDeConsulta from "../../components/FormularioConsulta/FormularioDeEdicaoDeConsulta";
import { Delete } from "../../service/web";

export default function EditarConsulta() {
  const [loading, setLoading] = useState(false);
  const { PageSetCurrentPage } = useContext(PagesContext);
  const { PacienteSelecionado } = useContext(PacienteContext);
  const navigate = useLocation();
  const pathName = navigate.pathname;
  const { consulta, SetConsulta } = useContext(PacienteContext);
  const navegue = useNavigate();
  const [editar, setEditar] = useState(false);

  useEffect(() => {
    PageSetCurrentPage(pathName);
  }, []);

  const handleEditConsulta = (event) => {
    SetConsulta({
      ...consulta,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(async () => {
      await Put(`consultas/${consulta.id}`, consulta);
      setEditar(false);
      setLoading(false);
    }, 4000);
  };

  const handleDeleteConsulta = async () => {
    await Delete(`consultas/${consulta.id}`).then(() =>
      navegue("/prontuario-paciente")
    );
  };

  const handleEditar = () => {
    setEditar(true);
  };
  return (
    <>
      <FormularioDeEdicaoDeConsulta
        loading={loading}
        consulta={consulta}
        paciente={PacienteSelecionado}
        handleEditConsulta={handleEditConsulta}
        handleSubmit={handleSubmit}
        handleDeleteConsulta={handleDeleteConsulta}
        handleEditar={handleEditar}
        editar={editar}
      />
    </>
  );
}
