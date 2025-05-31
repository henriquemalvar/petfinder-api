# PetFinder API

API para gerenciamento de pets e adoção de animais.

## 🚀 Tecnologias

- Node.js
- Express
- TypeScript
- Prisma
- SQLite
- JWT para autenticação

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/henriquemalvar/petfinder-api.git
cd petfinder-api
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações.

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

## 📝 Rotas da API

### Autenticação

Todas as rotas (exceto login e registro) requerem um token JWT no header `Authorization: Bearer <token>`.

- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/login` - Login de usuário

### Pets

- `GET /api/pets` - Listar todos os pets
- `GET /api/pets/:id` - Buscar pet por ID
- `POST /api/pets` - Criar pet
- `PUT /api/pets/:id` - Atualizar pet
- `PATCH /api/pets/:id` - Atualizar pet parcialmente
- `DELETE /api/pets/:id` - Deletar pet
- `GET /api/pets/user/:userId` - Buscar pets por usuário

### Posts

- `GET /api/posts` - Listar todos os posts
- `GET /api/posts/:id` - Buscar post por ID
- `POST /api/posts` - Criar post
- `PUT /api/posts/:id` - Atualizar post
- `PATCH /api/posts/:id` - Atualizar post parcialmente
- `DELETE /api/posts/:id` - Deletar post
- `GET /api/posts/user/:userId` - Buscar posts por usuário
- `GET /api/posts/pet/:petId` - Buscar posts por pet