import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function ApiTeste() {
  const [showForm, setShowForm] = useState(false);

  const [alunos, setAlunos] = useState([]);
  const [reload, setReload] = useState(false);
  const [form, setForm] = useState({
    processo: "",
    objeto: "",
    data: "",
    unidade: "",
    usuario: "",
    descricao: "",
  });

  //fetch -> api do navegador -> requisições http (get, put, pacth, delete, post) -> axios
  //promisses -> async/await

  //useEffect()
  // array de dependencias
  // [] -> vai rodar APENAS uma vez -> quando o componente/pagina for carregado
  // [state] -> toda vez que esse state MUDAR DE VALOR -> o código dentro do useEffect roda novamente.

  useEffect(() => {
    async function fetchStudents() {
      const response = await axios.get(
        "https://ironrest.cyclic.app/sei-jud"
      );
      setAlunos(response.data);
    }

    fetchStudents();
  }, [reload]);

  function handleReload() {
    // reload = false ----> ! => true
    // reload = true -----> ! => false
    setReload(!reload);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await axios.post("https://ironrest.cyclic.app/sei-jud", form);
    setForm({
      processo: "",
      objeto: "",
      data: "",
      unidade: "",
      usuario: "",
      descricao: "",
    });
    handleReload();
    toast.success("Processo criado com sucesso!");
    setShowForm(false);
  }

  return (
    <div>
      <h1>Lista dos Processos para Acompanhamento</h1>

      
      <button
        onClick={() => {
          setShowForm(!showForm);
        }}
      >
        Criar novo processo
      </button>

      {showForm && (
        <form>
          <div>
            <label>processo</label>
            <input
              type="text"
              name="processo"
              onChange={handleChange}
              value={form.processo}
            />
          </div>

          <div>
            <label>objeto</label>
            <input
              type="text"
              name="objeto"
              onChange={handleChange}
              value={form.objeto}
            />
          </div>

          <div>
            <label>data</label>
            <input
              type="text"
              name="data"
              onChange={handleChange}
              value={form.data}
            />
          </div>
          <div>
            <label>unidade</label>
            <input
              type="text"
              name="unidade"
              onChange={handleChange}
              value={form.unidade}
            />
          </div>
          <div>
            <label>usuario</label>
            <input
              type="text"
              name="usuario"
              onChange={handleChange}
              value={form.usuario}
            />
          </div>
          <div>
            <label>decricao</label>
            <input
              type="text"
              name="descricao"
              onChange={handleChange}
              value={form.descricao}
            />
          </div>

          <button onClick={handleSubmit}>Salvar processo</button>
        </form>
      )}

      <button onClick={handleReload}>Recarregar Página</button>

      {alunos.length > 14 && <p>Arquivo tem 06 processos</p>}

      <div className="cards">
        {alunos.map((aluno) => {
          return (
            <div key={aluno._id} className="card">
              <p>Processo nº: {aluno.processo} </p>
              <p>Objeto:{aluno.objeto}</p>
              <p>Data: {aluno.data}</p>
              <Link to={`/alunos/${aluno._id}`}>Ver detalhes</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ApiTeste;
