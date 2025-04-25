# 📘 ReceitaWs

Sistema de autenticação JWT e cadastro de empresas via CNPJ, estruturado com Clean Architecture, persistência em SQLite e deploy automatizado via Docker.

---

## 🎯 Funcionalidades

- ✅ Autenticação baseada em **JWT puro** (sem ASP.NET Identity)
- ✅ Endpoints para **registro, login e atualização** de usuários
- ✅ Persistência local com **SQLite** via **EF Core**
- ✅ Criação automática do usuário admin:
  ```plaintext
  Username: admin
  Password: admin123
  ```
- ✅ Separação por camadas utilizando **Clean Architecture**:
    - `Core` → Entidades e contratos
    - `Application` → DTOs, casos de uso e serviços
    - `Infrastructure` → EF Core, repositórios e Seeders
    - `API` → Controllers, middlewares, configuração da Web API
- ✅ Pronto para **deploy com Docker** (incluindo frontend Vue.js)

---

## 🚀 Execução com Docker

### 1. Clonar o repositório

```bash
    git clone https://github.com/seu-usuario/ReceitaWs.git
    cd ReceitaWs
```

### 2. Subir os containers

```bash
    docker compose up --build
```

Isso irá:
- Compilar a Web API e o frontend Vue.js
- Subir ambos os serviços em rede Docker privada
- Expor:
    - API em [http://localhost:5000](http://localhost:5000)
    - Frontend em [http://localhost:5001](http://localhost:5001)

---

## 🧪 Testar a API

Acesse a documentação Swagger:

```
http://localhost:5000/swagger
```

### Exemplo de login (`POST /api/auth/login`)

```json
{
  "username": "admin",
  "password": "admin123"
}
```

---

## 📂 Estrutura do Projeto

```bash
    ReceitaWs.sln
    ├── ReceitaWs.API              # Web API (camada de apresentação)
    ├── ReceitaWs.Application      # Casos de uso, serviços, DTOs
    ├── ReceitaWs.Core             # Domínio, entidades e interfaces
    ├── ReceitaWs.Infrastructure   # Banco de dados, repositórios
    ├── ReceitaWs.Web              # Frontend Next.js
    ├── docker-compose.yml         # Orquestração com Docker
    └── Dockerfiles                # Separados por projeto (API e Web)
```

---

## 📌 Tecnologias Utilizadas

- ASP.NET 9 Web API
- Entity Framework Core 8 + SQLite
- Vue.js 3 + Vite
- Docker + Docker Compose
- Clean Architecture (com base em SOLID)

---

