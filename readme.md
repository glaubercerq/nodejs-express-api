# Champions League API

Uma API RESTful completa para gerenciar jogadores e clubes da Champions League, desenvolvida com Node.js, Express e TypeScript.

## 🚀 Funcionalidades

- ✅ CRUD completo para Clubes
- ✅ CRUD completo para Jogadores
- ✅ Relacionamento entre Jogadores e Clubes
- ✅ Validação de dados
- ✅ CORS configurado
- ✅ Tratamento de erros
- ✅ TypeScript para tipagem estática

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Linguagem com tipagem estática
- **CORS** - Cross-Origin Resource Sharing
- **UUID** - Geração de IDs únicos

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd nodejs-express-api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Inicie o servidor:
```bash
# Modo desenvolvimento
npm run start:dev

# Modo desenvolvimento com watch
npm run start:watch

# Build e produção
npm run build
npm start
```

## 🌐 Endpoints da API

### Base URL
```
http://localhost:3333/api
```

### 🏆 Clubes

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/clubs` | Listar todos os clubes |
| GET | `/clubs/:id` | Buscar clube por ID |
| POST | `/clubs` | Criar novo clube |
| PUT | `/clubs/:id` | Atualizar clube |
| DELETE | `/clubs/:id` | Deletar clube |

#### Exemplo de Clube:
```json
{
  "id": "1",
  "name": "Real Madrid",
  "country": "Spain",
  "foundedYear": 1902,
  "stadium": "Santiago Bernabéu",
  "capacity": 81044,
  "coach": "Carlo Ancelotti",
  "website": "https://www.realmadrid.com"
}
```

### ⚽ Jogadores

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/players` | Listar todos os jogadores |
| GET | `/players/:id` | Buscar jogador por ID |
| GET | `/clubs/:clubId/players` | Listar jogadores de um clube |
| POST | `/players` | Criar novo jogador |
| PUT | `/players/:id` | Atualizar jogador |
| DELETE | `/players/:id` | Deletar jogador |

#### Exemplo de Jogador:
```json
{
  "id": "1",
  "name": "Karim Benzema",
  "age": 36,
  "position": "Forward",
  "nationality": "France",
  "clubId": "1",
  "shirtNumber": 9,
  "marketValue": 25000000,
  "height": 185,
  "weight": 81
}
```

## 📝 Exemplos de Uso

### Criar um novo clube:
```bash
curl -X POST http://localhost:3333/api/clubs \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Barcelona",
    "country": "Spain",
    "foundedYear": 1899,
    "stadium": "Camp Nou",
    "capacity": 99354,
    "coach": "Xavi Hernández"
  }'
```

### Criar um novo jogador:
```bash
curl -X POST http://localhost:3333/api/players \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Lionel Messi",
    "age": 36,
    "position": "Forward",
    "nationality": "Argentina",
    "clubId": "4",
    "shirtNumber": 30,
    "marketValue": 50000000,
    "height": 170,
    "weight": 72
  }'
```

## 🏗️ Estrutura do Projeto

```
src/
├── controllers/     # Controladores das rotas
├── data/           # Dados mockados (JSON)
├── models/         # Interfaces e tipos TypeScript
├── repositories/   # Camada de acesso aos dados
├── routes/         # Definição das rotas
├── services/       # Lógica de negócio
├── utils/          # Utilitários (status codes, etc.)
├── app.ts          # Configuração do Express
└── server.ts       # Ponto de entrada da aplicação
```

## 🧪 Scripts Disponíveis

- `npm run start:dev` - Inicia em modo desenvolvimento
- `npm run start:watch` - Inicia com auto-reload
- `npm run build` - Gera build de produção
- `npm start` - Inicia versão de produção

## 🔒 CORS

A API está configurada com CORS habilitado para todas as origens em desenvolvimento. Para produção, configure adequadamente as origens permitidas.

## 📊 Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.
