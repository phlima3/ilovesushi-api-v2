# ilovesushi-api 🍣

API completa construída com NestJS, PostgreSQL e Prisma para o sistema ilovesushi.

## 🚀 Características

- **Framework**: NestJS (última versão estável)
- **Banco de Dados**: PostgreSQL 15
- **ORM**: Prisma
- **Containerização**: Docker e Docker Compose
- **Node.js**: Versão 20
- **Autenticação**: Mono-usuário (sem auth obrigatória)
- **Documentação**: Swagger/OpenAPI
- **Logs**: Pino (estruturados)
- **Testes**: Jest + Supertest
- **Linting**: ESLint + Prettier
- **Hooks**: Husky para pre-commit
- **Deploy**: Configurado para Render.com

## 📋 Pré-requisitos

- Node.js 20+
- Docker e Docker Compose
- npm ou yarn

## 🛠️ Instalação

### 1. Clonar o repositório

```bash
git clone <repository-url>
cd ilovesushi-api
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

### 4. Iniciar o banco de dados

```bash
docker-compose up -d postgres
```

### 5. Executar migrações

```bash
npm run db:migrate
```

### 6. Popular banco de dados (opcional)

```bash
npm run db:seed
```

### 7. Iniciar a aplicação

```bash
npm run dev
```

## 🚀 Deploy no Render

Para fazer deploy da API no Render com PostgreSQL gratuito, consulte o guia completo:

**[📖 Guia de Deploy no Render](RENDER_DEPLOY.md)**

### Resumo Rápido:

1. **Criar conta no [Render.com](https://render.com)**
2. **Criar banco PostgreSQL** (Free tier)
3. **Criar Web Service** conectando ao repositório
4. **Configurar variáveis de ambiente**
5. **Deploy automático**

### Configurações do Render:

```yaml
Build Command: npm ci && npx prisma generate && npm run build
Start Command: npm run start:prod
Health Check: /health
```

## 🎯 Endpoints

A aplicação estará disponível em:

- **API**: http://localhost:3001
- **Swagger**: http://localhost:3001/api-docs
- **Health Check**: http://localhost:3001/health

## 📊 Banco de Dados

### Configuração

- **Host**: localhost
- **Porta**: 5433 (evita conflito com PostgreSQL local)
- **Database**: ilovesushi_db
- **Usuário**: postgres
- **Senha**: postgres123

### Comandos Úteis

```bash
# Gerar cliente Prisma
npm run db:generate

# Executar migrações
npm run db:migrate

# Resetar banco
npm run db:reset

# Abrir Prisma Studio
npm run db:studio

# Fazer push do schema
npm run db:push
```

## 🐳 Docker

### Desenvolvimento

```bash
# Iniciar apenas PostgreSQL
docker-compose up -d postgres

# Iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down

# Parar e remover volumes
docker-compose down -v
```

### Produção

```bash
# Build para produção
docker build --target production -t ilovesushi-api .

# Executar
docker run -p 3001:3001 ilovesushi-api
```

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes com watch
npm run test:watch

# Testes e2e
npm run test:e2e

# Coverage
npm run test:cov
```

## 📁 Estrutura do Projeto

```
ilovesushi-api/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── src/
│   ├── common/
│   │   ├── filters/
│   │   ├── interceptors/
│   │   └── pipes/
│   ├── database/
│   │   └── prisma/
│   │       ├── prisma.module.ts
│   │       └── prisma.service.ts
│   ├── health/
│   │   ├── health.controller.ts
│   │   ├── health.service.ts
│   │   └── health.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── app.module.ts
│   └── main.ts
├── test/
├── docker-compose.yml
├── Dockerfile
├── .env.example
└── README.md
```

## 🔧 Scripts Disponíveis

| Script                | Descrição                      |
| --------------------- | ------------------------------ |
| `npm run dev`         | Inicia em modo desenvolvimento |
| `npm run build`       | Build para produção            |
| `npm run start`       | Inicia aplicação               |
| `npm run start:prod`  | Inicia em produção             |
| `npm run lint`        | Executa linter                 |
| `npm run format`      | Formata código                 |
| `npm run test`        | Executa testes                 |
| `npm run test:watch`  | Testes com watch               |
| `npm run test:e2e`    | Testes end-to-end              |
| `npm run test:cov`    | Coverage dos testes            |
| `npm run db:migrate`  | Executar migrações             |
| `npm run db:seed`     | Popular banco                  |
| `npm run db:reset`    | Resetar banco                  |
| `npm run db:studio`   | Abrir Prisma Studio            |
| `npm run db:generate` | Gerar cliente Prisma           |

## 🌟 Recursos Implementados

### Segurança

- Helmet para headers de segurança
- Rate limiting (100 req/min)
- Validação de entrada com class-validator
- CORS configurado

### Observabilidade

- Logs estruturados com Pino
- Health checks
- Request ID tracking
- Exception filters globais

### Performance

- Compressão gzip
- Connection pooling
- Request timeout

### Qualidade

- ESLint + Prettier
- Husky pre-commit hooks
- Testes unitários e e2e
- Test containers

## 📚 Próximos Módulos

A API está preparada para receber os seguintes módulos:

1. **menu-items** - Gerenciamento de itens do menu
2. **ingredients** - Controle de ingredientes
3. **fixed-prices** - Preços fixos
4. **sales-volume** - Volume de vendas
5. **token** - Sistema de tokens

## 🤝 Desenvolvimento

### Comandos de Desenvolvimento

```bash
# Instalar dependências
npm install

# Configurar hooks
npm run prepare

# Desenvolvimento
npm run dev

# Linting
npm run lint

# Formatação
npm run format
```

### Padrões de Código

- Use TypeScript
- Siga as convenções do ESLint
- Documente endpoints com Swagger
- Escreva testes para novos recursos
- Use commits semânticos

## 🔍 Troubleshooting

### Problemas Comuns

1. **Porta 5433 ocupada**

   ```bash
   # Verificar processos na porta
   lsof -i :5433

   # Parar PostgreSQL local se necessário
   brew services stop postgresql
   ```

2. **Erro de conexão com banco**

   ```bash
   # Verificar se containers estão rodando
   docker-compose ps

   # Reiniciar banco
   docker-compose restart postgres
   ```

3. **Erro de migração**

   ```bash
   # Resetar banco
   npm run db:reset

   # Aplicar migrações novamente
   npm run db:migrate
   ```

## 📄 Licença

Este projeto está sob a licença MIT.

## 🙋‍♂️ Suporte

Para dúvidas ou problemas:

1. Verifique o troubleshooting
2. Consulte a documentação do Swagger
3. Abra uma issue no repositório
