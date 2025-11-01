# Guia de Deploy - Dashboard de Inventário LRJ07

Este documento descreve como implantar o dashboard em produção.

## Opções de Deploy

### 1. Deploy no Vercel (Recomendado)

O Vercel é a plataforma oficial para Vite e oferece deploy automático.

#### Passo 1: Criar conta no Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up"
3. Conecte com sua conta GitHub

#### Passo 2: Importar Projeto
1. No dashboard do Vercel, clique em "Add New..." → "Project"
2. Selecione o repositório `inventory-dashboard-lrj07`
3. Clique em "Import"

#### Passo 3: Configurar Variáveis de Ambiente
1. Na página de configuração, vá para "Environment Variables"
2. Adicione as seguintes variáveis:

```
DATABASE_URL=postgresql://user:password@host:5432/inventory_db
VITE_API_URL=https://seu-dominio.vercel.app
```

#### Passo 4: Deploy
1. Clique em "Deploy"
2. Aguarde a conclusão (geralmente 2-5 minutos)
3. Seu site estará disponível em `seu-projeto.vercel.app`

### 2. Deploy no Railway

Railway oferece suporte completo para Node.js + PostgreSQL.

#### Passo 1: Criar conta no Railway
1. Acesse [railway.app](https://railway.app)
2. Clique em "Start a New Project"
3. Conecte com GitHub

#### Passo 2: Criar Serviços
1. Clique em "New Service"
2. Selecione "GitHub Repo"
3. Escolha `inventory-dashboard-lrj07`

#### Passo 3: Adicionar PostgreSQL
1. Clique em "Add Service" → "Database"
2. Selecione "PostgreSQL"
3. Railway criará automaticamente a variável `DATABASE_URL`

#### Passo 4: Configurar Build
1. Vá para "Variables"
2. Adicione `VITE_API_URL` com a URL do seu projeto

#### Passo 5: Deploy
1. Clique em "Deploy"
2. Seu site estará disponível em `seu-projeto.up.railway.app`

### 3. Deploy no Render

Render oferece suporte para aplicações Node.js com banco de dados.

#### Passo 1: Criar conta no Render
1. Acesse [render.com](https://render.com)
2. Clique em "Sign up"
3. Conecte com GitHub

#### Passo 2: Criar Web Service
1. Clique em "New +" → "Web Service"
2. Selecione o repositório `inventory-dashboard-lrj07`
3. Configure:
   - **Name**: `inventory-dashboard-lrj07`
   - **Environment**: `Node`
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: `pnpm dev:server`

#### Passo 3: Adicionar Banco de Dados
1. Clique em "New +" → "PostgreSQL"
2. Configure o banco de dados
3. Copie a `DATABASE_URL` gerada

#### Passo 4: Configurar Variáveis
1. No Web Service, vá para "Environment"
2. Adicione:
   - `DATABASE_URL`: (da etapa anterior)
   - `VITE_API_URL`: `https://seu-projeto.onrender.com`

#### Passo 5: Deploy
1. Clique em "Create Web Service"
2. Aguarde o deploy
3. Seu site estará disponível em `seu-projeto.onrender.com`

### 4. Deploy no Heroku (com GitHub Actions)

#### Passo 1: Criar conta no Heroku
1. Acesse [heroku.com](https://heroku.com)
2. Crie uma conta

#### Passo 2: Criar Aplicação
```bash
heroku create seu-app-name
heroku addons:create heroku-postgresql:hobby-dev
```

#### Passo 3: Configurar Secrets no GitHub
1. Vá para seu repositório → Settings → Secrets and variables → Actions
2. Adicione:
   - `HEROKU_API_KEY`: (de https://dashboard.heroku.com/account)
   - `HEROKU_APP_NAME`: seu-app-name
   - `HEROKU_EMAIL`: seu-email@example.com

#### Passo 4: GitHub Actions fará o deploy automaticamente
Cada push para `main` acionará o deploy automático.

## Configuração do Banco de Dados

Após o deploy, execute as migrations:

```bash
pnpm db:push
```

Ou, se estiver usando Drizzle Studio:

```bash
pnpm db:studio
```

## Variáveis de Ambiente Necessárias

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | URL de conexão PostgreSQL | `postgresql://user:pass@host:5432/db` |
| `VITE_API_URL` | URL da API em produção | `https://seu-dominio.com` |
| `PORT` | Porta do servidor (opcional) | `3001` |

## Domínio Customizado

### Vercel
1. Vá para Project Settings → Domains
2. Clique em "Add Domain"
3. Digite seu domínio
4. Siga as instruções de DNS

### Railway/Render
1. Vá para Settings
2. Procure por "Custom Domain"
3. Adicione seu domínio e configure DNS

## Monitoramento

### Logs
- **Vercel**: Dashboard → Deployments → Logs
- **Railway**: Dashboard → Deployments → Logs
- **Render**: Dashboard → Logs

### Performance
- Vercel: Analytics integrado
- Railway: Metrics
- Render: Logs e CPU/Memory

## Troubleshooting

### Erro: DATABASE_URL não configurada
Verifique se a variável de ambiente foi adicionada corretamente no painel de controle.

### Erro: Build falha
1. Verifique se `pnpm install` está funcionando localmente
2. Verifique se há erros de TypeScript: `pnpm build`
3. Verifique os logs do deploy

### Erro: API não conecta
1. Verifique se `VITE_API_URL` está correto
2. Verifique se o backend está rodando
3. Verifique CORS nas configurações do Express

## Próximos Passos

1. **Configurar domínio customizado** (opcional)
2. **Ativar HTTPS** (automático na maioria das plataformas)
3. **Configurar backups** do banco de dados
4. **Monitorar performance** e logs
5. **Configurar alertas** para erros

## Suporte

Para dúvidas sobre deploy, consulte a documentação oficial:
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
