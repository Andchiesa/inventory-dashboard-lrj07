# Dashboard de Inventário LRJ07 - Guia de Uso

**Website**: Dashboard interativo para análise de dados de inventário

**Acesso**: Público (sem login necessário)

## Powered by Manus

Este dashboard foi construído com tecnologias modernas e profissionais:

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Express.js com Node.js
- **Banco de Dados**: PostgreSQL com Drizzle ORM
- **Visualizações**: Recharts para gráficos interativos
- **Design**: Paleta de cores oficial da Shopee
- **Deployment**: Auto-scaling infrastructure com global CDN

## Usando Seu Dashboard

### 1. Carregar Planilha de Dados

O dashboard permite que você atualize os dados diariamente através de uma planilha Excel. Para fazer isso:

1. Clique no botão **"Carregar Planilha"** ou arraste um arquivo Excel diretamente na área designada
2. Selecione um arquivo `.xlsx` contendo as guias: missing, comercial, justificativas e backlog
3. O sistema processará automaticamente os dados e exibirá uma mensagem de sucesso

### 2. Visualizar Métricas Consolidadas

Na parte superior do dashboard, você verá **quatro cards com métricas principais**:

- **Total Missing**: Quantidade total de itens excluídos
- **Total Comercial**: Soma de vendas registradas (sábados e domingos)
- **Total Backlog**: Quantidade total de itens em backlog
- **Total Justificativas**: Quantidade de justificativas registradas

### 3. Analisar Gráficos

O dashboard exibe dois gráficos interativos:

- **Gráfico de Barras (Missing por Operação)**: Mostra quantidade encontrada vs. total excluído para operações AM e DDP
- **Gráfico de Pizza (Backlog por Operação)**: Distribui visualmente o backlog entre as operações

### 4. Consultar Dados Detalhados

Navegue pelas **abas na parte inferior** para visualizar tabelas com dados completos:

- **Aba Missing**: Data, operação, quantidade encontrada e total excluído
- **Aba Comercial**: Data e total de vendas
- **Aba Justificativas**: Data, operação, descrição da tratativa e total
- **Aba Backlog**: Data, operação e quantidade em backlog

## Estrutura da Planilha Excel

Sua planilha deve conter **quatro guias** com as seguintes colunas:

### Guia "missing"
| data | operacao | quantidadeEncontrada | totalExcluido |
|------|----------|----------------------|---------------|
| 2025-10-31 | AM | 45 | 3 |
| 2025-10-31 | DDP | 28 | 2 |

### Guia "comercial"
| data | total |
|------|-------|
| 2025-10-26 | 1250 |
| 2025-10-25 | 1180 |

### Guia "justificativas"
| data | operacao | tratativa | total |
|------|----------|-----------|-------|
| 2025-10-31 | AM | Produto danificado | 2 |
| 2025-10-31 | DDP | Erro de contagem | 1 |

### Guia "backlog"
| data | operation | backlog |
|------|-----------|---------|
| 2025-10-31 | AM | 120 |
| 2025-10-31 | DDP | 85 |

## Próximos Passos

Converse com a Manus IA a qualquer momento para solicitar novas funcionalidades, como:

- Integração com Google Sheets para atualização automática
- Relatórios agendados por email
- Exportação de dados em PDF
- Autenticação de usuários
- Histórico completo de uploads
- Filtros e comparações avançadas entre períodos

Comece carregando sua primeira planilha e explore os dados em tempo real!
