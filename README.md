## transfers_saoPaulo

Aplicação full stack desenvolvida em **Node.js (backend)** e **React (frontend)** que consome a [API-Football](https://www.api-football.com/) no endpoint `transfers`, utilizando o parâmetro `id=126` (São Paulo FC).  
O sistema permite visualizar todas as transferências relacionadas ao clube e realizar **buscas refinadas**, trazendo praticidade e organização para os dados.

---

## 🚀 Funcionalidades
- 📋 Listagem de todas as transferências do São Paulo FC  
- 🔎 Filtros personalizados por:
  - Idade do jogador  
  - Dia, mês ou ano da transferência  
  - Combinações de filtros avançados  
- 🌐 Comunicação entre frontend e backend com Axios  
- 📱 Interface responsiva e de fácil uso  

---

## 🛠️ Tecnologias utilizadas
### Backend
- **Node.js**  
- **Express**  
- **Axios** (requisições à API-Football)  

### Frontend
- **React.js**  
- **Axios** (requisições ao backend)  
- **CSS3** para estilização e responsividade  

---

## 📂 Estrutura de pastas atualmente
```bash
├── backend/
│   ├── controllers/
│   │   └── outsideController.js
│   ├── routes/
│   │   ├── outsideRoute.js
│   │   └── index.js
│   ├── node_modules/
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   └── searchTransfers.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   ├── node_modules/
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```
## Preview

Ainda vou colocar a preview

## 🚀 Como executar o projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2️⃣ Executar o backend

```bash
cd backend
npm install
npm start
```

### 3️⃣ Executar o frontend

```bash
cd frontend
npm install
npm start
```
