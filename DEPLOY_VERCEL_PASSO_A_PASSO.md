# Deploy no Vercel - Passo a Passo

## 🎯 Objetivo
Implantar o Dashboard de Inventário LRJ07 permanentemente no Vercel com domínio próprio.

---

## ✅ Pré-requisitos

- ✓ Repositório no GitHub: `https://github.com/Andchiesa/inventory-dashboard-lrj07`
- ✓ Conta no Vercel (gratuita)
- ✓ Banco de dados PostgreSQL (Neon, Railway, Supabase, etc)

---

## 📋 Passo 1: Criar Conta no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"Sign Up"**
3. Escolha **"Continue with GitHub"**
4. Autorize o Vercel a acessar seus repositórios
5. Pronto! Você está logado no Vercel

---

## 📋 Passo 2: Importar Projeto

1. No dashboard do Vercel, clique em **"Add New..."** → **"Project"**
2. Procure por **"inventory-dashboard-lrj07"**
3. Clique em **"Import"**

---

## 📋 Passo 3: Configurar Projeto

Na tela de configuração do projeto:

### Framework Preset
- Vercel detectará automaticamente como **Vite**
- Deixe como está ✓

### Build Command
- Deixe como: `pnpm build` ✓

### Output Directory
- Deixe como: `dist` ✓

### Install Command
- Deixe como: `pnpm install` ✓

---

## 📋 Passo 4: Configurar Banco de Dados

Você precisa de um banco PostgreSQL. Escolha uma opção:

### Opção A: Neon (Recomendado - Gratuito)

1. Acesse [neon.tech](https://neon.tech)
2. Clique em **"Sign Up"** e use sua conta GitHub
3. Crie um novo projeto
4. Copie a **Connection String** (DATABASE_URL)
5. Formato: `postgresql://user:password@host/database`

### Opção B: Railway

1. Acesse [railway.app](https://railway.app)
2. Clique em **"New Project"** → **"Provision PostgreSQL"**
3. Copie a **DATABASE_URL** gerada automaticamente

### Opção C: Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Vá para Settings → Database → Connection String
4. Copie a string de conexão

---

## 📋 Passo 5: Adicionar Variáveis de Ambiente

De volta ao Vercel:

1. Na página de configuração, vá para **"Environment Variables"**
2. Clique em **"Add New"**
3. Adicione as seguintes variáveis:

### Variável 1: DATABASE_URL
- **Name**: `DATABASE_URL`
- **Value**: (Cole a string de conexão do banco que você copiou)
- Clique em **"Add"**

### Variável 2: VITE_API_URL
- **Name**: `VITE_API_URL`
- **Value**: `https://seu-projeto.vercel.app`
  - (Substitua "seu-projeto" pelo nome do seu projeto no Vercel)
- Clique em **"Add"**

---

## 📋 Passo 6: Fazer Deploy

1. Clique em **"Deploy"**
2. Aguarde a conclusão (geralmente 2-5 minutos)
3. Você verá uma mensagem: **"Congratulations! Your project has been successfully deployed"**

---

## 📋 Passo 7: Verificar Deploy

1. Clique em **"Visit"** para abrir seu site
2. Você deverá ver o Dashboard de Inventário LRJ07
3. Teste o upload de planilha com o arquivo `sample_inventory.xlsx`

---

## 📋 Passo 8: Configurar Domínio Customizado (Opcional)

Se você tiver um domínio próprio (ex: inventario.seusite.com):

1. No Vercel, vá para **"Settings"** → **"Domains"**
2. Clique em **"Add"**
3. Digite seu domínio
4. Siga as instruções de DNS (adicione registros CNAME)
5. Aguarde a propagação (até 48 horas)

---

## 🔄 Passo 9: Configurar Atualizações Automáticas

Agora, sempre que você fizer um `git push` para a branch `main`:

1. GitHub notifica o Vercel
2. Vercel faz um novo build automaticamente
3. Seu site é atualizado em produção

Teste isso:
```bash
git add .
git commit -m "Test auto-deploy"
git push origin main
```

Vá para o Vercel e veja o novo deploy começar automaticamente!

---

## 🚨 Troubleshooting

### Erro: "Build failed"
1. Verifique os logs: Clique em **"Deployments"** → Seu deployment → **"Logs"**
2. Procure por mensagens de erro
3. Verifique se todas as variáveis de ambiente estão corretas

### Erro: "DATABASE_URL is not configured"
1. Volte para **"Settings"** → **"Environment Variables"**
2. Verifique se `DATABASE_URL` está presente
3. Clique em **"Redeploy"** após adicionar/corrigir

### Erro: "Cannot connect to database"
1. Verifique se a string de conexão está correta
2. Verifique se o banco de dados está ativo
3. Verifique se há firewall bloqueando conexões

### Site mostra erro 404
1. Verifique se o build foi bem-sucedido
2. Aguarde alguns minutos para o site ser propagado
3. Limpe o cache do navegador (Ctrl+Shift+Delete)

---

## ✨ Pronto!

Seu Dashboard de Inventário LRJ07 está **online e permanente**! 🎉

### Próximos Passos:
1. ✅ Compartilhe a URL com sua equipe
2. ✅ Comece a usar o dashboard diariamente
3. ✅ Faça upload de novas planilhas regularmente
4. ✅ Solicite novas funcionalidades à Manus IA

---

## 📞 Precisa de Ajuda?

- **Documentação Vercel**: https://vercel.com/docs
- **Documentação Neon**: https://neon.tech/docs
- **Fale com Manus IA**: Para suporte técnico ou novas funcionalidades

---

## 🔐 Segurança

⚠️ **Importante:**
- Nunca compartilhe sua `DATABASE_URL` publicamente
- Use variáveis de ambiente para dados sensíveis
- Revogue tokens de acesso quando não precisar mais
- Faça backups regulares do banco de dados

---

**Parabéns! Seu site está ao vivo!** 🚀
