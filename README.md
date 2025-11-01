# Dashboard de Inventário LRJ07

Dashboard interativo para análise de dados de inventário com upload de planilha Google Sheets.

## Características

- ✅ Upload de planilhas Excel (.xlsx)
- ✅ Visualização de dados em tempo real
- ✅ Gráficos interativos (barras, pizza)
- ✅ Métricas consolidadas
- ✅ Tabelas com dados detalhados
- ✅ Design profissional com cores da Shopee
- ✅ Interface responsiva

## Guias de Dados Suportadas

1. **Missing**: Data, Operação (AM/DDP), Quantidade Encontrada, Total Excluído
2. **Comercial**: Data, Total (registrado aos sábados e domingos)
3. **Justificativas**: Data, Operação (AM/DDP), Tratativa, Total
4. **Backlog**: Data, Operation (AM/DDP), Backlog

## Requisitos

- Node.js 18+
- pnpm
- PostgreSQL (para banco de dados)

## Instalação

```bash
# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações
```

## Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento (frontend)
pnpm dev

# Em outro terminal, iniciar servidor backend
pnpm dev:server

# Ou, para desenvolvimento simultâneo, use:
# Terminal 1
pnpm dev

# Terminal 2
pnpm dev:server
```

O dashboard estará disponível em `http://localhost:5173`

## Banco de Dados

```bash
# Gerar migrations
pnpm db:push

# Abrir Drizzle Studio para gerenciar dados
pnpm db:studio
```

## Build

```bash
# Build frontend
pnpm build

# Build server
pnpm build:server
```

## Estrutura do Projeto

```
.
├── src/
│   ├── components/        # Componentes React
│   ├── pages/            # Páginas da aplicação
│   ├── types/            # Tipos TypeScript
│   ├── styles/           # Estilos e cores
│   ├── utils/            # Utilitários
│   └── App.tsx           # Componente principal
├── server/
│   ├── db/               # Configuração do banco de dados
│   ├── utils/            # Utilitários do servidor
│   └── index.ts          # Servidor Express
├── .env                  # Variáveis de ambiente
└── vite.config.ts        # Configuração do Vite
```

## Uso

1. Acesse o dashboard em `http://localhost:5173`
2. Clique em "Carregar Planilha" ou arraste um arquivo Excel
3. Selecione um arquivo .xlsx com as guias: missing, comercial, justificativas, backlog
4. Os dados serão processados e exibidos em tempo real
5. Navegue pelas abas para visualizar diferentes dados
6. Consulte os gráficos e métricas consolidadas

## Cores da Paleta Shopee

- **Primário**: #EE7724 (Laranja)
- **Primário Escuro**: #D85E1A
- **Primário Claro**: #F59E5C
- **Secundário**: #111111 (Preto)
- **Acento**: #ECDF8C (Amarelo)

## API Endpoints

- `POST /api/upload` - Fazer upload de planilha
- `GET /api/data` - Obter todos os dados
- `GET /api/data/missing` - Obter dados de missing
- `GET /api/data/comercial` - Obter dados comerciais
- `GET /api/data/justificativas` - Obter justificativas
- `GET /api/data/backlog` - Obter backlog

## Licença

MIT
