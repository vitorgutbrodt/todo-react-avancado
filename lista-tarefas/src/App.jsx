import { useEffect, useState } from 'react';
import './estilos/app.css'
import './estilos/desktop.css'
import Tarefa from './components/tarefa.jsx'
import { useInput } from './hooks/useInput.jsx';
import { useRecoilState, useRecoilValue } from "recoil";
import { filtroState, tarefasState, tarefasFiltradasState } from "./state/tarefasrecoil.js";

export default function App() {

  const [filtro, setFiltro] = useRecoilState(filtroState);
  const [tarefas, setTarefas] = useRecoilState(tarefasState);

  // carregando tarefas pelo Recoil
  const tarefasFiltradas = useRecoilValue(tarefasFiltradasState);

  useEffect(() => {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);
  
  const tarefa = useInput();  

  useEffect(() => {
    console.log("Componente App carregado");
  }, []) 

  const handleSubmit = (e) => {
  e.preventDefault();

  if (tarefa.valor.trim() === '') {
    return;
  }

  setTarefas(tarefas => [
    ...tarefas,
    { id: Date.now(), nome: tarefa.valor, concluida: false }
  ]);

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

