import { atom, selector } from "recoil";

const tarefasIniciais = () => {
  const tarefasSalvas = localStorage.getItem("tarefas");
  return tarefasSalvas ? JSON.parse(tarefasSalvas) : []; // para as tarefas não sumirem ao recarregar a página
};

export const tarefasState = atom({
  key: "tarefasState", // guarda as tarefas
  default: tarefasIniciais()
});

export const filtroState = atom({
  key: "filtroState", // guarda qual filtro está ativo
  default: "todas"
});

export const tarefasFiltradasState = selector({
  key: "tarefasFiltradasState", // calcula tarefas ou filtros, sempre que mudarem recalcula
  get: ({ get }) => {
    const tarefas = get(tarefasState);
    const filtro = get(filtroState);

    if (filtro === "concluidas") {
      return tarefas.filter(t => t.concluida);
    }

    if (filtro === "pendentes") {
      return tarefas.filter(t => !t.concluida);
    }

    return tarefas;
  }
});