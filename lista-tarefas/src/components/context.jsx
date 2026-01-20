import { createContext, useContext, useEffect, useState } from "react";

const TarefasContext = createContext();

export function TarefasProvider({ children }) {

  const [tarefas, setTarefas] = useState(() => {
    const salvas = localStorage.getItem("tarefas");
    return salvas ? JSON.parse(salvas) : [];
  });

  useEffect(() => {
    // aqui seria um bom lugar para:
    // → sincronizar as tarefas com o backend
    // → salvar alterações feitas localmente
    console.log("Salvando tarefas:", tarefas);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  function toggleConcluida(id) {
    // aqui apenas alternamos o estado local da tarefa
    // futuramente:
    // → fetch PUT / PATCH para atualizar a tarefa no backend
    setTarefas(tarefas =>
      tarefas.map(t =>
        t.id === id ? { ...t, concluida: !t.concluida } : t
      )
    );
  }

  function removerTarefa(id) {
    // removendo tarefa localmente
    // futuramente:
    // → fetch DELETE para apagar a tarefa no backend
    setTarefas(tarefas => tarefas.filter(t => t.id !== id));
  }

  function adicionarTarefa(nome) {
    // registrando nova tarefa localmente
    // futuramente:
    // → fetch POST para salvar a tarefa no backend
    setTarefas(tarefas => [
      ...tarefas,
      { id: Date.now(), nome, concluida: false }
    ]);
  }

  return (
    <TarefasContext.Provider value={{
      tarefas,
      adicionarTarefa,
      removerTarefa,
      toggleConcluida
    }}>
      {children}
    </TarefasContext.Provider>
  );
}

export function useTarefas() {
  return useContext(TarefasContext);
}
