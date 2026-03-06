# Task Manager 

Essa é uma aplicação de gestão de tarefas por projeto construída como parte de um teste técnico para Full Stack Developer.
A aplicação permite criar projetos, associar tarefas a projetos, atualizar status das tarefas e filtrá-las.

---

## Tecnologias 

### Backend
- Laravel 12
- PHP 8+
- SQLite (padrão para facilitar setup)
- Eloquent ORM
- API Resources
- Form Request Validation
- PHPUnit (Feature Tests)

### Frontend
- Vue 3
- TypeScript
- Pinia (state management)
- Vite
- TailwindCSS
- Vitest (unit tests)

---

## Setup

### Pré-requisitos

- PHP 8.2+
- Composer 
- Node.js 18+ 
- NPM
- Extensão SQLite habilitada no PHP

Para verificar as versões:

```bash

php -v
composer -V
node -v
npm -v

```

---

### Instalação 

1. Clonar o repositório

```bash

git clone https://github.com/LMartelini/task-manager.git
cd task-manager

```

2. Configuração do Backend

```bash

composer install
cp .env.example .env
php artisan key:generate

```

Criar o banco SQLite
```bash

touch database/database.sqlite

```

3. Rodar migrations e seed

```bash

php artisan migrate --seed

```

Isso criará:
 - Projetos de exemplo
 - Tarefas de exemplo

4. Iniciar servidor backend

```bash

php artisan serve

```

A API estará disponível em:

http://127.0.0.1:8000/api

5. Iniciar frontend

```bash

cd frontend
npm install
npm run dev

```

Frontend disponível em: 

http://localhost:5173

---

## Decisões Técnicas

Algumas decisões técnicas foram tomadas para manter o projeto simples e fácil de executar:

### SQLite como banco padrão

SQLite foi escolhido para evitar configuração adicional de banco de dados, dessa forma permite que o projeto seja executado rapidamente apenas rodando as migrations.

### Separação Backend / Frontend

O frontend foi desenvolvido em um diretório separado (`frontend`) utilizando Vue 3 com Vite, consumindo a API REST do Laravel.

### Pinia para gerenciamento de estado

Pinia foi utilizado para centralizar o estado das tarefas e lidar com operações como:

- carregar tarefas
- criar tarefas
- atualizar status

### Debounce nos filtros

Os filtros de tarefas utilizam debounce para evitar múltiplas requisições simultâneas no backend enquanto o usuário altera os filtros.

### Optimistic Update

A atualização de status da tarefa utiliza **optimistic UI update**, atualizando a interface imediatamente antes da confirmação da API.

Caso a requisição falhe, o status anterior é restaurado.

## Rodar testes

Para executar os testes:

### Backend: 

```bash

php artisan test

```

### Frontend:

```bash

cd frontend
npm run test

```

---

## Implementações que faltaram

Algumas melhorias poderiam ser implementadas em uma versão futura:

- Paginação das tarefas no frontend
- Melhor feedback visual para erros da API
- Edição e exclusão de tarefas
- Melhor cobertura de testes no frontend
- Docker para facilitar ainda mais o setup do ambiente

## Estrutura do projeto

task-manager
│
├── app/              # Backend Laravel
├── database/
├── routes/
├── tests/
│
├── frontend/         # Aplicação Vue
│   ├── src/
│   ├── components/
│   ├── stores/
│   └── tests/
│
└── README.md

<h3 align='center'>Desenvolvido por Laís Martelini</h3>
<div align='center'>
  <a href="mailto:laismartelini03@gmail.com" title="Gmail">
     <img src="https://img.shields.io/badge/-Gmail-FF0000?style=flat-square&labelColor=FF0000&logo=gmail&logoColor=white" alt="Gmail" style='height: 25px'/>
  </a>
  <a href="https://www.linkedin.com/in/laís-martelini/" title="LinkedIn">
     <img src="https://img.shields.io/badge/-Linkedin-0e76a8?style=flat-square&logo=Linkedin&logoColor=white" style='height: 25px' alt="LinkedIn"/>
  </a>
  <a href="https://api.whatsapp.com/send?phone=14998212175" title="WhatsApp">
     <img src="https://img.shields.io/badge/-WhatsApp-25d366?style=flat-square&labelColor=25d366&logo=whatsapp&logoColor=white" alt="WhatsApp" style='height: 25px'/>
  </a>
</div>
