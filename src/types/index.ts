// Tipos para as guias da planilha

export interface MissingRecord {
  id?: string;
  data: string;
  operacao: 'AM' | 'DDP';
  quantidadeEncontrada: number;
  totalExcluido: number;
  createdAt?: string;
}

export interface ComercialRecord {
  id?: string;
  data: string;
  total: number;
  createdAt?: string;
}

export interface JustificativaRecord {
  id?: string;
  data: string;
  operacao: 'AM' | 'DDP';
  tratativa: string;
  total: number;
  createdAt?: string;
}

export interface BacklogRecord {
  id?: string;
  data: string;
  operation: 'AM' | 'DDP';
  backlog: number;
  createdAt?: string;
}

export interface InventoryData {
  missing: MissingRecord[];
  comercial: ComercialRecord[];
  justificativas: JustificativaRecord[];
  backlog: BacklogRecord[];
}

export interface UploadResponse {
  success: boolean;
  message: string;
  data?: InventoryData;
  error?: string;
}
