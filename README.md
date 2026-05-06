
#  Eventos-API

API REST para Sistema de Gestão de Eventos, desenvolvida com Node.js, Express e MongoDB.

##  Como rodar o projeto

### Pré-requisitos
- Node.js instalado
- MongoDB rodando localmente

### Instalação

```bash
git clone https://github.com/stelaN88/Eventos-API.git
cd Eventos-API
npm install
```

Crie um arquivo `.env` baseado no `.env.example`:
```bash
cp .env.example .env
```

Edite o `.env` com suas configurações e rode:
```bash
npm run dev
```

## Endpoints

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /api/auth/registrar | Registrar novo usuário |
| POST | /api/auth/login | Login e geração de token |

## Eventos (requer token JWT)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /api/eventos | Listar todos os eventos |
| GET | /api/eventos/:id | Buscar evento por ID |
| POST | /api/eventos 🔒 | Criar novo evento |
| PUT | /api/eventos/:id 🔒 | Atualizar evento |
| DELETE | /api/eventos/:id 🔒 | Deletar evento |
| POST | /api/eventos/:id/inscrever 🔒 | Inscrever-se em um evento |

## Autenticação
Nas rotas protegidas, envie o token no header:

## Segurança
- Senhas criptografadas com BCrypt
- Autenticação via JWT
- Proteção contra NoSQL Injection com express-mongo-sanitize