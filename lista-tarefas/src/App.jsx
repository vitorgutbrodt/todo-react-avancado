import { useEffect, useState } from 'react'
import './estilos/app.css'
import './estilos/desktop.css'
import Tarefa from './components/tarefa.jsx'
import { useInput } from './hooks/useInput.jsx'
import { useTarefas } from './components/context.jsx'

export default function App() {

  const [filtro, setFiltro] = useState("todas"); // preparando filtro para as tarefas

  // carregando tarefas do Context
  const { tarefas, adicionarTarefa } = useTarefas();

  // aplicando filtro às tarefas
  const tarefasFiltradas = tarefas.filter(t => {
    if (filtro === "concluidas") return t.concluida;
    if (filtro === "pendentes") return !t.concluida;
    return true;
  });

  const [carregando, setCarregando] = useState(true);
  const tarefa = useInput();  

  useEffect(() => {
    console.log("Componente App carregado");
  }, []) 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (tarefa.valor.trim() === '') {
      // alert("Preencha os campos obrigatórios!");
      return;
    }

    // criação de tarefas através do Context
    adicionarTarefa(tarefa.valor);

    tarefa.limpar();  
  }  

  return (
    <main>    

      <form onSubmit={handleSubmit}>
        <h2>Cadastre uma nova tarefa!</h2>

        <input
          className="input-cadastro"
          type="text"
          placeholder="NOME DA TAREFA"
          value={tarefa.valor}
          onChange={tarefa.onChange}
        />            

        <button type="submit" className="botao-cadastro">
          CADASTRAR
        </button>
      </form>

      <div className="tarefas-container-maior">

        <div className="filtros">
          <button className="filtros-botao" onClick={() => setFiltro("todas")}>Todas</button>
          <button className="filtros-botao" onClick={() => setFiltro("pendentes")}>Pendentes</button>
          <button className="filtros-botao" onClick={() => setFiltro("concluidas")}>Concluídas</button>
        </div>

        <div className="tarefas-wrapper">
          <div className="tarefas-container">
          {tarefasFiltradas.map(tarefa => (
          <Tarefa key={tarefa.id} tarefa={tarefa} />
          ))}
        </div>
      </div>

      </div>

    </main>
  );
}

