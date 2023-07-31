import FormularioDeEdicaoDeExame from "../../components/FormularioExame/FormularioDeEdicaoDeExame";
import { PacienteContext } from "../../context/PacienteContext";
import { PagesContext } from "../../context/PagesContext";
import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Put } from "../../service/web";
import { Delete } from "../../service/web";

export default function EditarExame() {
  const [loading, setLoading] = useState(false);
  const { PageSetCurrentPage } = useContext(PagesContext);
  const { PacienteSelecionado } = useContext(PacienteContext);
  const navigate = useLocation();
  const pathName = navigate.pathname;
  const { exame, SetExame } = useContext(PacienteContext);
  const navegue = useNavigate();
  const [editar, setEditar] = useState(false);

  useEffect(() => {
    PageSetCurrentPage(pathName);
  }, []);

  const handleEditExame = (event) => {
    SetExame({
      ...exame,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(async () => {
      await Put(`exames/${exame.id}`, exame);
      setEditar(false);
      setLoading(false);
    }, 4000);
  };

  const handleDeleteExame = async () => {
    await Delete(`exames/${exame.id}`).then(() =>
      navegue("/prontuario-paciente")
    );
  };

  const handleEditar = () => {
    setEditar(true);
  };

  return (
    <>
      <FormularioDeEdicaoDeExame
        loading={loading}
        exame={exame}
        paciente={PacienteSelecionado}
        handleEditExame={handleEditExame}
        handleSubmit={handleSubmit}
        handleDeleteExame={handleDeleteExame}
        handleEditar={handleEditar}
        editar={editar}
      />
    </>
  );
}
