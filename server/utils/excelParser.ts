import * as XLSX from 'xlsx';
import { InventoryData, MissingRecord, ComercialRecord, JustificativaRecord, BacklogRecord } from '../../src/types';

export function parseExcelFile(filePath: string): InventoryData {
  const workbook = XLSX.readFile(filePath);
  
  const data: InventoryData = {
    missing: [],
    comercial: [],
    justificativas: [],
    backlog: [],
  };

  // Processar guia "missing"
  if (workbook.SheetNames.includes('missing')) {
    const missingSheet = XLSX.utils.sheet_to_json(workbook.Sheets['missing']);
    data.missing = missingSheet.map((row: any) => ({
      data: row.data || row.Data || '',
      operacao: row.operacao || row.Operacao || '',
      quantidadeEncontrada: parseInt(row.quantidadeEncontrada || row['Quantidade Encontrada'] || 0),
      totalExcluido: parseInt(row.totalExcluido || row['Total Excluído'] || 0),
    }));
  }

  // Processar guia "comercial"
  if (workbook.SheetNames.includes('comercial')) {
    const comercialSheet = XLSX.utils.sheet_to_json(workbook.Sheets['comercial']);
    data.comercial = comercialSheet.map((row: any) => ({
      data: row.data || row.Data || '',
      total: parseInt(row.total || row.Total || 0),
    }));
  }

  // Processar guia "justificativas"
  if (workbook.SheetNames.includes('justificativas')) {
    const justificativasSheet = XLSX.utils.sheet_to_json(workbook.Sheets['justificativas']);
    data.justificativas = justificativasSheet.map((row: any) => ({
      data: row.data || row.Data || '',
      operacao: row.operacao || row.Operacao || '',
      tratativa: row.tratativa || row.Tratativa || '',
      total: parseInt(row.total || row.Total || 0),
    }));
  }

  // Processar guia "backlog"
  if (workbook.SheetNames.includes('backlog')) {
    const backlogSheet = XLSX.utils.sheet_to_json(workbook.Sheets['backlog']);
    data.backlog = backlogSheet.map((row: any) => ({
      data: row.data || row.Data || '',
      operation: row.operation || row.Operation || '',
      backlog: parseInt(row.backlog || row.Backlog || 0),
    }));
  }

  return data;
}
