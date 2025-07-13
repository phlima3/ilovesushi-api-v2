# 🚀 Deploy da API ilovesushi no Render

Este guia explica como fazer deploy da API NestJS ilovesushi no Render com PostgreSQL gratuito.

## 📋 Pré-requisitos

- Conta no [Render.com](https://render.com)
- Repositório Git com o código da API
- Acesso ao GitHub para conectar o repositório

## 🗄️ 1. Criar Banco PostgreSQL

### No Dashboard Render:

1. **New** → **PostgreSQL**
2. **Configurações**:
   - **Name**: `ilovesushi-db`
   - **Database**: `ilovesushi_db`
   - **User**: `ilovesushi_user`
   - **Region**: `Oregon (US West)` ou região mais próxima
   - **PostgreSQL Version**: `15`
   - **Plan**: **Free** (100MB storage)

3. **Aguardar criação** (~2 minutos)
4. **Copiar dados de conexão**:
   - **Internal Database URL**: Para uso interno
   - **External Database URL**: Para conexões externas

## 🌐 2. Configurar Web Service

### No Dashboard Render:

1. **New** → **Web Service**
2. **Connect Repository**: Selecionar seu repo
3. **Configurações**:

```yaml
# Configuração do Web Service
Name: ilovesushi-api
Environment: Node
Region: Oregon (US West) (mesma do banco)
Branch: main (ou sua branch principal)
Root Directory: . (deixar vazio se API está na raiz)

# Build & Deploy
Build Command: npm ci && npx prisma generate && npm run build
Start Command: npm run start:prod
# Ou usar o script personalizado:
# Build Command: ./scripts/render-deploy.sh
# Start Command: npm run start:prod
```

## 🔧 3. Configurar Variáveis de Ambiente

### No Web Service → Environment:

```env
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://user:password@host:5432/database
ALLOWED_ORIGINS=https://your-frontend-domain.com,http://localhost:3000
```

**⚠️ Importante**:

- Substituir `DATABASE_URL` pela URL real do PostgreSQL criado no passo 1
- Ajustar `ALLOWED_ORIGINS` para os domínios do seu frontend

## 🏥 4. Configurar Health Check

### No Web Service → Settings:

```yaml
Health Check Path: /health
Health Check Timeout: 180
```

## 📊 5. Configurações Avançadas

### Auto-Deploy:

- ✅ **Auto-Deploy**: Habilitado
- **Branch**: `main`

### Environment Variables Adicionais:

```env
# Logging
LOG_LEVEL=info

# Security
HELMET_ENABLED=true
COMPRESSION_ENABLED=true
```

## 🔄 6. Deploy e Monitoramento

### Primeiro Deploy:

1. Clicar em **Create Web Service**
2. Aguardar build e deploy (~5-10 minutos)
3. Verificar logs em tempo real

### Monitoramento:

- **Logs**: Dashboard → Logs
- **Metrics**: Dashboard → Metrics
- **Health**: Endpoint `/health`

## 🧪 7. Testes Pós-Deploy

### Verificar Health Check:

```bash
curl https://your-app-name.onrender.com/health
```

### Verificar API:

```bash
curl https://your-app-name.onrender.com/menu-items
```

## 🚨 8. Troubleshooting

### Problemas Comuns:

#### Build Fails:

- Verificar se `package.json` tem `engines.node: "20.x"`
- Verificar se `postinstall` script está configurado
- Verificar se `prisma generate` está no build command

#### Database Connection Fails:

- Verificar se `DATABASE_URL` está correta
- Verificar se banco PostgreSQL está ativo
- Verificar se migrations foram executadas

#### CORS Errors:

- Verificar se `ALLOWED_ORIGINS` está configurado
- Verificar se frontend está na lista de origens permitidas

#### App Crashes:

- Verificar logs no dashboard Render
- Verificar se porta está configurada corretamente
- Verificar se `start:prod` script existe

## 📈 9. Escalabilidade

### Free Tier Limitations:

- **Web Service**: 750 horas/mês
- **PostgreSQL**: 100MB storage
- **Sleep**: 15 minutos de inatividade

### Upgrade para Paid:

- **Web Service**: $7/mês (sempre ativo)
- **PostgreSQL**: $7/mês (1GB storage)

## 🔗 10. URLs Importantes

- **API**: `https://your-app-name.onrender.com`
- **Health Check**: `https://your-app-name.onrender.com/health`
- **Swagger**: `https://your-app-name.onrender.com/api-docs` (apenas dev)

## 📝 11. Comandos Úteis

### Local Development:

```bash
# Instalar dependências
npm install

# Gerar Prisma client
npx prisma generate

# Executar migrations
npm run db:migrate

# Seed database
npm run db:seed

# Desenvolver
npm run dev
```

### Production:

```bash
# Build
npm run build

# Start production
npm run start:prod

# Deploy migrations
npm run db:deploy
```

## 🎉 Sucesso!

Sua API ilovesushi está agora rodando no Render com PostgreSQL gratuito!

### Próximos Passos:

1. Configurar domínio customizado (opcional)
2. Configurar CI/CD com GitHub Actions
3. Implementar monitoramento avançado
4. Configurar backups do banco de dados
