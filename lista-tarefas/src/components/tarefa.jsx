import { useState, useEffect, memo } from "react";
import './tarefa.css';
import { useTarefas } from "./context.jsx";

function Tarefa({ tarefa }) {
  const { toggleConcluida, removerTarefa } = useTarefas();

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