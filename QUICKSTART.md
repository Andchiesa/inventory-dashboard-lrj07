# Quick Start - Dashboard de Inventário LRJ07

## 🚀 Setup Rápido (5 minutos)

### 1. Clone o repositório
```bash
git clone https://github.com/Andchiesa/inventory-dashboard-lrj07.git
cd inventory-dashboard-lrj07
```

### 2. Instale as dependências
```bash
pnpm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite `.env` e adicione:
```
DATABASE_URL=postgresql://user:password@localhost:5432/inventory_db
VITE_API_URL=http://localhost:3001
```

### 4. Inicie o desenvolvimento

**Terminal 1 - Frontend:**
```bash
pnpm dev
```

**Terminal 2 - Backend:**
```bash
pnpm dev:server
```

### 5. Acesse o dashboard
Abra seu navegador em: **http://localhost:5173**

---

## 📊 Usando o Dashboard

1. Clique em **"Carregar Planilha"**
2. Selecione um arquivo Excel (.xlsx) com as guias:
   - `missing`
   - `comercial`
   - `justificativas`
   - `backlog`
3. Os dados aparecerão em tempo real

### Arquivo de Exemplo
Use o arquivo `sample_inventory.xlsx` incluído no repositório para testar!

---

## 🌐 Deploy em Produção

### Opção 1: Vercel (Recomendado)
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Import Project"
3. Selecione seu repositório GitHub
4. Configure as variáveis de ambiente
5. Deploy automático!

### Opção 2: Railway
1. Acesse [railway.app](https://railway.app)
2. Clique em "New Project"
3. Selecione "Deploy from GitHub"
4. Railway criará automaticamente o banco de dados PostgreSQL
5. Seu site estará online em minutos!

### Opção 3: Render
1. Acesse [render.com](https://render.com)
2. Clique em "New +" → "Web Service"
3. Conecte seu repositório GitHub
4. Configure e deploy!

📖 **Instruções detalhadas**: Veja [DEPLOY.md](./DEPLOY.md)

---

## 🛠️ Comandos Úteis

```bash
# Build para produção
pnpm build

# Executar linter
pnpm lint

# Gerenciar banco de dados
pnpm db:push          # Aplicar migrations
pnpm db:studio        # Interface visual do banco

# Criar arquivo de exemplo
node create_sample_excel.mjs
```

---

## 📁 Estrutura do Projeto

```
.
├── src/                    # Frontend React
│   ├── components/         # Componentes reutilizáveis
│   ├── pages/             # Páginas
│   ├── types/             # Tipos TypeScript
│   └── styles/            # Estilos e cores
├── server/                # Backend Express
│   ├── db/               # Banco de dados
│   └── utils/            # Utilitários
├── .github/workflows/     # CI/CD
├── DEPLOY.md             # Guia de deploy
├── README.md             # Documentação completa
└── package.json          # Dependências
```

---

## 🎨 Customização

### Mudar cores
Edite `src/styles/colors.ts` para usar outras cores além da Shopee.

### Adicionar novas guias
1. Adicione a guia ao arquivo Excel
2. Atualize `server/utils/excelParser.ts`
3. Adicione o tipo em `src/types/index.ts`
4. Crie a tabela no banco em `server/db/schema.ts`
5. Adicione a rota da API em `server/index.ts`

---

## ❓ Dúvidas Frequentes

**P: Como faço para usar meu próprio domínio?**
R: Após fazer deploy, configure o domínio nas configurações da plataforma (Vercel, Railway, etc).

**P: Posso usar MySQL em vez de PostgreSQL?**
R: Sim, mas você precisará atualizar o Drizzle ORM. Veja a [documentação do Drizzle](https://orm.drizzle.team).

**P: Como faço backup do banco de dados?**
R: A maioria das plataformas oferece backups automáticos. Verifique as configurações.

**P: Posso adicionar autenticação?**
R: Sim! Você pode usar Auth0, Clerk ou implementar sua própria autenticação. Fale com Manus IA!

---

## 📞 Suporte

Dúvidas ou problemas? Fale com **Manus IA** para:
- Adicionar novas funcionalidades
- Resolver problemas de deploy
- Otimizar performance
- Integrar com outros serviços

---

## 📄 Licença

MIT - Veja [LICENSE](./LICENSE) para detalhes.

---

**Pronto para começar?** 🎉 Siga os 5 passos acima e seu dashboard estará rodando em minutos!
