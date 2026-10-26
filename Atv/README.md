# StudyHub — atividade de React.js

Projeto acadêmico introdutório feito com React e Vite. A interface simula um painel para organizar tarefas de estudo.

## Como executar no GitHub Codespaces

1. Abra seu repositório no GitHub Codespaces.
2. Envie os arquivos deste projeto para o repositório.
3. No terminal, execute:

```bash
npm install
npm run dev -- --host 0.0.0.0
```

4. Abra a porta indicada pelo Codespaces para visualizar a página.

## Componentes incluídos

1. **Accordion:** abre e fecha perguntas frequentes.
2. **Pagination:** permite navegar entre páginas da lista de tarefas.
3. **ProgressBar:** mostra o percentual de tarefas concluídas.
4. **Tabs:** alterna entre resumo, disciplinas e dicas.
5. **Dropdown:** filtra tarefas por todas, pendentes ou concluídas.
6. **Toast:** mostra uma mensagem temporária quando uma tarefa ou filtro é atualizado.

## Conceitos React usados

- Componentes funcionais.
- `props` para enviar dados aos componentes.
- `useState` para guardar estados locais.
- `useEffect` para fechar a notificação após alguns segundos.
- Eventos como `onClick` e `onChange`.
- CSS responsivo para telas pequenas e grandes.

## Observação

Este projeto é uma base de estudo. Antes de entregar, personalize textos e aparência, teste os componentes e esteja preparado para explicar o código com suas próprias palavras.
