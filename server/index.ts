import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { parseExcelFile } from './utils/excelParser';
import { db, initializeDatabase } from './db';
import { missingTable, comercialTable, justificativasTable, backlogTable } from './db/schema';
import { eq } from 'drizzle-orm';
import { InventoryData, UploadResponse } from '../src/types';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configurar multer para upload de arquivos
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `inventory_${Date.now()}.xlsx`);
  },
});

const upload = multer({ storage });

// Rotas

/**
 * POST /api/upload
 * Faz upload da planilha e processa os dados
 */
app.post('/api/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Nenhum arquivo foi enviado',
      } as UploadResponse);
    }

    // Parsear o arquivo Excel
    const inventoryData = parseExcelFile(req.file.path);

    // Limpar dados antigos (opcional - comentado para manter histórico)
    // await db.delete(missingTable);
    // await db.delete(comercialTable);
    // await db.delete(justificativasTable);
    // await db.delete(backlogTable);

    // Inserir dados da guia missing
    if (inventoryData.missing.length > 0) {
      await db.insert(missingTable).values(inventoryData.missing);
    }

    // Inserir dados da guia comercial
    if (inventoryData.comercial.length > 0) {
      await db.insert(comercialTable).values(inventoryData.comercial);
    }

    // Inserir dados da guia justificativas
    if (inventoryData.justificativas.length > 0) {
      await db.insert(justificativasTable).values(inventoryData.justificativas);
    }

    // Inserir dados da guia backlog
    if (inventoryData.backlog.length > 0) {
      await db.insert(backlogTable).values(inventoryData.backlog);
    }

    // Limpar arquivo temporário
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      message: 'Dados importados com sucesso',
      data: inventoryData,
    } as UploadResponse);
  } catch (error) {
    console.error('Erro ao processar upload:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao processar o arquivo',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    } as UploadResponse);
  }
});

/**
 * GET /api/data
 * Retorna todos os dados do inventário
 */
app.get('/api/data', async (req: Request, res: Response) => {
  try {
    const [missing, comercial, justificativas, backlog] = await Promise.all([
      db.select().from(missingTable),
      db.select().from(comercialTable),
      db.select().from(justificativasTable),
      db.select().from(backlogTable),
    ]);

    res.json({
      success: true,
      data: {
        missing,
        comercial,
        justificativas,
        backlog,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
});

/**
 * GET /api/data/missing
 * Retorna dados da guia missing
 */
app.get('/api/data/missing', async (req: Request, res: Response) => {
  try {
    const data = await db.select().from(missingTable);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Erro ao buscar dados missing:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
});

/**
 * GET /api/data/comercial
 * Retorna dados da guia comercial
 */
app.get('/api/data/comercial', async (req: Request, res: Response) => {
  try {
    const data = await db.select().from(comercialTable);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Erro ao buscar dados comercial:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
});

/**
 * GET /api/data/justificativas
 * Retorna dados da guia justificativas
 */
app.get('/api/data/justificativas', async (req: Request, res: Response) => {
  try {
    const data = await db.select().from(justificativasTable);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Erro ao buscar dados justificativas:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
});

/**
 * GET /api/data/backlog
 * Retorna dados da guia backlog
 */
app.get('/api/data/backlog', async (req: Request, res: Response) => {
  try {
    const data = await db.select().from(backlogTable);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Erro ao buscar dados backlog:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
});

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Inicializar servidor
async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`✓ Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

startServer();
