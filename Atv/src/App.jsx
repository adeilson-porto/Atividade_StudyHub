import { useEffect, useState } from "react";

// Componente 1: Acordeão
function Accordion({ items }) {
  const [openItem, setOpenItem] = useState(0);

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div className="accordion-item" key={item.title}>
          <button
            className="accordion-title"
            onClick={() => setOpenItem(openItem === index ? -1 : index)}
            aria-expanded={openItem === index}
          >
            {item.title}
            <span>{openItem === index ? "−" : "+"}</span>
          </button>
          <div className={`accordion-content ${openItem === index ? "open" : ""}`}>
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Componente 2: Paginação
function Pagination({ totalPages, currentPage, onPageChange }) {
  return (
    <nav className="pagination" aria-label="Paginação das tarefas">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          className={currentPage === page ? "page-active" : ""}
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Próxima
      </button>
    </nav>
  );
}

// Componente 3: Barra de progresso
function ProgressBar({ value }) {
  return (
    <div>
      <div className="progress-label">
        <span>Progresso semanal</span>
        <strong>{value}%</strong>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="Progresso semanal"
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div className="progress-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

// Componente 4: Abas
function Tabs() {
  const [activeTab, setActiveTab] = useState("resumo");

  const tabContent = {
    resumo: "Organize seus estudos em pequenas etapas e acompanhe o que já foi concluído.",
    disciplinas: "Suas disciplinas: Programação Web, Banco de Dados e Engenharia de Software.",
    dicas: "Dica: estude por 25 minutos e faça uma pausa curta antes de continuar."
  };

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Conteúdo de estudos">
        <button role="tab" aria-selected={activeTab === "resumo"} onClick={() => setActiveTab("resumo")}>Resumo</button>
        <button role="tab" aria-selected={activeTab === "disciplinas"} onClick={() => setActiveTab("disciplinas")}>Disciplinas</button>
        <button role="tab" aria-selected={activeTab === "dicas"} onClick={() => setActiveTab("dicas")}>Dicas</button>
      </div>
      <div className="tab-panel" role="tabpanel">
        {tabContent[activeTab]}
      </div>
    </div>
  );
}

// Componente 5: Menu suspenso
function Dropdown({ onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const options = ["Todas as tarefas", "Pendentes", "Concluídas"];

  function chooseOption(option) {
    onSelect(option);
    setIsOpen(false);
  }

  return (
    <div className="dropdown">
      <button className="secondary-button" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        Filtrar tarefas ▾
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <button key={option} onClick={() => chooseOption(option)}>{option}</button>
          ))}
        </div>
      )}
    </div>
  );
}

// Componente 6: Notificação Toast
function Toast({ message, type, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`toast ${type}`} role="status">
      <span>{message}</span>
      <button onClick={onClose} aria-label="Fechar notificação">×</button>
    </div>
  );
}

const initialTasks = [
  { id: 1, title: "Revisar componentes React", done: true },
  { id: 2, title: "Praticar o useState", done: false },
  { id: 3, title: "Estudar CSS responsivo", done: false },
  { id: 4, title: "Fazer exercícios de JavaScript", done: true },
  { id: 5, title: "Revisar props", done: false },
  { id: 6, title: "Preparar atividade da faculdade", done: false }
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("Todas as tarefas");
  const [toast, setToast] = useState({ message: "", type: "success" });

  const tasksPerPage = 3;
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Pendentes") return !task.done;
    if (filter === "Concluídas") return task.done;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / tasksPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * tasksPerPage;
  const visibleTasks = filteredTasks.slice(startIndex, startIndex + tasksPerPage);
  const completedCount = tasks.filter((task) => task.done).length;
  const progress = Math.round((completedCount / tasks.length) * 100);

  function toggleTask(id) {
    setTasks(tasks.map((task) => task.id === id ? { ...task, done: !task.done } : task));
    setToast({ message: "Tarefa atualizada!", type: "success" });
  }

  function changeFilter(option) {
    setFilter(option);
    setCurrentPage(1);
    setToast({ message: `Filtro selecionado: ${option}`, type: "info" });
  }

  function closeToast() {
    setToast({ message: "", type: "success" });
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-mark">S</div>
        <div>
          <h1>StudyHub</h1>
          <p>Seu espaço para organizar os estudos</p>
        </div>
        <span className="student-label">Área do estudante</span>
      </header>

      <section className="welcome">
        <div>
          <p className="eyebrow">SEU PAINEL</p>
          <h2>Olá, estudante! 👋</h2>
          <p>Um passo de cada vez. Acompanhe suas tarefas e continue aprendendo.</p>
        </div>
        <div className="welcome-icon" aria-hidden="true">📚</div>
      </section>

      <section className="stats-grid" aria-label="Resumo dos estudos">
        <article className="stat-card">
          <span className="stat-icon purple">✓</span>
          <p>Tarefas concluídas</p>
          <strong>{completedCount} de {tasks.length}</strong>
        </article>
        <article className="stat-card">
          <span className="stat-icon orange">◷</span>
          <p>Tarefas pendentes</p>
          <strong>{tasks.length - completedCount}</strong>
        </article>
        <article className="stat-card">
          <span className="stat-icon green">↗</span>
          <p>Progresso geral</p>
          <strong>{progress}%</strong>
        </article>
      </section>

      <div className="content-grid">
        <section className="panel tasks-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">ORGANIZAÇÃO</p>
              <h2>Minhas tarefas</h2>
            </div>
            <Dropdown onSelect={changeFilter} />
          </div>
          <ProgressBar value={progress} />
          <div className="task-list">
            {visibleTasks.length > 0 ? visibleTasks.map((task) => (
              <label className={`task-row ${task.done ? "task-done" : ""}`} key={task.id}>
                <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
                <span className="custom-check" aria-hidden="true"></span>
                <span>{task.title}</span>
                <small>{task.done ? "Concluída" : "Pendente"}</small>
              </label>
            )) : <p className="empty-state">Nenhuma tarefa encontrada.</p>}
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={safePage}
            onPageChange={setCurrentPage}
          />
        </section>

        <section className="panel learning-panel">
          <p className="eyebrow">APRENDA MAIS</p>
          <h2>Central de estudos</h2>
          <p className="panel-description">Consulte informações e dicas para manter sua rotina.</p>
          <Tabs />
        </section>
      </div>

      <section className="panel faq-panel">
        <p className="eyebrow">DÚVIDAS COMUNS</p>
        <h2>Perguntas frequentes</h2>
        <Accordion items={[
          { title: "Como organizo minhas tarefas?", content: "Consulte a lista de tarefas e marque a caixa ao lado de uma atividade quando terminá-la." },
          { title: "Como funciona o progresso?", content: "A barra mostra a porcentagem de tarefas concluídas em relação ao total de tarefas." },
          { title: "Posso filtrar as tarefas?", content: "Sim! Use o menu Filtrar tarefas para visualizar todas, apenas as pendentes ou as concluídas." }
        ]} />
      </section>

      <footer>StudyHub · Projeto acadêmico desenvolvido com React.js</footer>
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />
    </main>
  );
}

export default App;
