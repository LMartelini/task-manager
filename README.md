# Task Manager 

Essa é uma aplicação de gestão de tarefas por projeto construída com Laravel 12, SQLite e Vue 3.

---

## Tecnologias 

### Backend
- Laravel 12
- PHP 8+
- SQLite (padrão para facilitar setup)
- PHPUnit (Feature Tests)
- Rate Limiting
- Soft Deletes

---

## Setup

### Pré-requisitos

- PHP 8.2 ou superior 
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
cp .env.example .env
composer install
php artisan key:generate
```

Criar o banco SQLite
```bash
touch database/database.sqlite
```

Certifique-se de que o .env contém:

```bash
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

3. Rodar migrations e seed

```bash
php artisan migrate --seed
```

4. Iniciar servidor backend

```bash
php artisan serve
```

A API estará disponível em:

http://127.0.0.1:8000/api

5. Configuração do frontend

```bash
cd frontend
npm install
npm run dev
```

### Rodar testes

Para executar os testes:

```bash
php artisan test
```
---

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
