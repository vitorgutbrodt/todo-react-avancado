import { memo } from "react";
import './tarefa.css';
import { useRecoilState } from "recoil";
import { tarefasState } from "../state/tarefasrecoil";

function Tarefa({ tarefa }) {

  const [tarefas, setTarefas] = useRecoilState(tarefasState);

  function toggleConcluida(id) {
    setTarefas(tarefas =>
      tarefas.map(t =>
        t.id === id ? { ...t, concluida: !t.concluida } : t
      )
    );
  }

  function removerTarefa(id) {
    setTarefas(tarefas =>
      tarefas.filter(t => t.id !== id)
    );
  }

  return (
    <div className="tarefa">
      <input
        type="checkbox"
        checked={tarefa.concluida}
        onChange={() => toggleConcluida(tarefa.id)}
      />

      <span className={tarefa.concluida ? "concluida" : ""}>
        {tarefa.nome}
      </span>

      <button onClick={() => removerTarefa(tarefa.id)}>X</button>
    </div>
  );
}

export default memo(Tarefa);