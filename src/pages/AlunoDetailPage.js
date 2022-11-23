import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function AlunoDetailPage() {
  const { alunoID } = useParams();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(true);

  const [reload, setReload] = useState(false);
  const [aluno, setAluno] = useState({});
  const [form, setForm] = useState({
      processo: "",
      objeto: "",
      data: "",
      unidade: "",
      usuario: "",
      descricao: "",
  });

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(
        `https://ironrest.cyclic.app/sei-jud/${alunoID}`
      );
      setAluno(response.data);
    
      setForm(response.data);
    }

    fetchUser();
  }, [reload]);

  async function handleDelete(e) {
    await axios.delete(`https://ironrest.cyclic.app/sei-jud/${alunoID}`);
    navigate("/api-teste");
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
   
      const clone = { ...form };
    
      delete clone._id;

      await axios.put(
        `https://ironrest.cyclic.app/sei-jud/${alunoID}`,
        clone
      );
      setReload(!reload);
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Página dos Processos Importantes!</h1>
      <button
        onClick={() => {
          setShowForm(!showForm);
          setReload(!reload);
        }}
      >
        Editar Processo!
      </button>

      {!showForm && (
        <div>
          <p>Processo nº: {aluno.processo}</p>
          <p>Objeto: {aluno.objeto}</p>
          <p>Data: {aluno.data}</p>
          <p>Unidade atual: {aluno.unidade}</p> 
          <p>Usuario: {aluno.usuario}</p>
        </div>
      )}

      {showForm === true && (
        <form>
          <div>
            <label>processo</label>
            <input
              type="text"
              onChange={handleChange}
              name="processo"
              value={form.processo}
            />
          </div>

          <div>
            <label>objeto</label>
            <input
              type="text"
              onChange={handleChange}
              name="objeto"
              value={form.objeto}
            />
          </div>

          <div>
            <label>data</label>
            <input
              type="text"
              onChange={handleChange}
              name="data"
              value={form.data}
            />
          </div>
          <div>
            <label>unidade</label>
            <input
              type="text"
              onChange={handleChange}
              name="unidade"
              value={form.unidade}
            />
          </div>
          <div>
            <label>usuario</label>
            <input
              type="text"
              onChange={handleChange}
              name="usuario"
              value={form.usuario}
            />
          </div>
          <div>
            <label>descricao</label>
            <input
              type="text"
              onChange={handleChange}
              name="descricao"
              value={form.descricao}
            />
          </div>

          <button onClick={handleSubmit}>Salvar! </button>
        </form>
      )}

      <button onClick={handleDelete}>Deletar!</button>
    </div>
  );
}

export default AlunoDetailPage;
