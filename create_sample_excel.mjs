import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Criar workbook
const wb = XLSX.utils.book_new();

// Dados da guia missing
const missingData = [
  { data: '2025-10-31', operacao: 'AM', quantidadeEncontrada: 45, totalExcluido: 3 },
  { data: '2025-10-31', operacao: 'DDP', quantidadeEncontrada: 28, totalExcluido: 2 },
  { data: '2025-10-30', operacao: 'AM', quantidadeEncontrada: 52, totalExcluido: 5 },
  { data: '2025-10-30', operacao: 'DDP', quantidadeEncontrada: 31, totalExcluido: 1 },
];

// Dados da guia comercial (apenas sábados e domingos)
const comercialData = [
  { data: '2025-10-26', total: 1250 },
  { data: '2025-10-25', total: 1180 },
  { data: '2025-10-19', total: 1320 },
  { data: '2025-10-18', total: 1410 },
];

// Dados da guia justificativas
const justificativasData = [
  { data: '2025-10-31', operacao: 'AM', tratativa: 'Produto danificado no transporte', total: 2 },
  { data: '2025-10-31', operacao: 'DDP', tratativa: 'Erro de contagem no estoque', total: 1 },
  { data: '2025-10-30', operacao: 'AM', tratativa: 'Produto fora de validade', total: 3 },
  { data: '2025-10-30', operacao: 'DDP', tratativa: 'Código de barras ilegível', total: 1 },
];

// Dados da guia backlog
const backlogData = [
  { data: '2025-10-31', operation: 'AM', backlog: 120 },
  { data: '2025-10-31', operation: 'DDP', backlog: 85 },
  { data: '2025-10-30', operation: 'AM', backlog: 95 },
  { data: '2025-10-30', operation: 'DDP', backlog: 72 },
];

// Criar abas
const wssMissing = XLSX.utils.json_to_sheet(missingData);
const wsComercial = XLSX.utils.json_to_sheet(comercialData);
const wsJustificativas = XLSX.utils.json_to_sheet(justificativasData);
const wsBacklog = XLSX.utils.json_to_sheet(backlogData);

// Adicionar abas ao workbook
XLSX.utils.book_append_sheet(wb, wssMissing, 'missing');
XLSX.utils.book_append_sheet(wb, wsComercial, 'comercial');
XLSX.utils.book_append_sheet(wb, wsJustificativas, 'justificativas');
XLSX.utils.book_append_sheet(wb, wsBacklog, 'backlog');

// Salvar arquivo
const filePath = path.join(__dirname, 'sample_inventory.xlsx');
XLSX.writeFile(wb, filePath);

console.log(`✓ Arquivo de exemplo criado: ${filePath}`);
