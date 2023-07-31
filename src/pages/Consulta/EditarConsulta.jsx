import { PacienteContext } from "../../context/PacienteContext";
import { PagesContext } from "../../context/PagesContext";
import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Put } from "../../service/web";
import FormularioDeEdicaoDeConsulta from "../../components/FormularioConsulta/FormularioDeEdicaoDeConsulta";
import { Delete } from "../../service/web";

//descobrir pq ta salvandoaedição de dosagemapenas
export default function EditarConsulta() {
  const { PageSetCurrentPage } = useContext(PagesContext);
  const { PacienteSelecionado } = useContext(PacienteContext);
  const navigate = useLocation();
  const pathName = navigate.pathname;
  const { consulta, SetConsulta } = useContext(PacienteContext);
  const navegue = useNavigate();
  const [editar, setEditar] = useState(false);

  useEffect(() => {
    PageSetCurrentPage(pathName);
    console.log(pathName);
  }, []);

  const handleEditConsulta = (event) => {
    SetConsulta({
      ...consulta,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    console.log(consulta);
    await Put(`consultas/${consulta.id}`, consulta);
    setEditar(false);
  };

  const handleDeleteConsulta = async () => {
    console.log('Deletar consulta');
    await Delete (`consultas/${consulta.id}`).then(()=>navegue('/prontuario-paciente'));
    
  }

  const handleEditar = () =>{
    setEditar(true);
  }
  return (
    <>
      <FormularioDeEdicaoDeConsulta
        consulta={consulta}
        paciente={PacienteSelecionado}
        handleEditConsulta={handleEditConsulta}
        handleSubmit={handleSubmit}
        handleDeleteConsulta = {handleDeleteConsulta}
        handleEditar = {handleEditar}
        editar = {editar}
      />
    </>
  );
}
