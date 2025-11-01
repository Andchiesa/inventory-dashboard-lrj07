import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Calendar,
} from 'lucide-react';
import { FileUpload } from '../components/FileUpload';
import { MetricCard } from '../components/MetricCard';
import { DataTable } from '../components/DataTable';
import { Tabs } from '../components/Tabs';
import { ShopeeColors, Gradients } from '../styles/colors';
import { InventoryData } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<InventoryData>({
    missing: [],
    comercial: [],
    justificativas: [],
    backlog: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('missing');
  const [lastUpdate, setLastUpdate] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/data`);
      if (response.data.success) {
        setData(response.data.data);
        setLastUpdate(new Date().toLocaleString('pt-BR'));
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setData(response.data.data);
        setLastUpdate(new Date().toLocaleString('pt-BR'));
      }
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao fazer upload do arquivo'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Calcular métricas
  const totalMissing = data.missing.reduce((sum, item) => sum + item.totalExcluido, 0);
  const totalComercial = data.comercial.reduce((sum, item) => sum + item.total, 0);
  const totalBacklog = data.backlog.reduce((sum, item) => sum + item.backlog, 0);
  const totalJustificativas = data.justificativas.reduce((sum, item) => sum + item.total, 0);

  // Dados para gráficos
  const missingByOperation = data.missing.reduce(
    (acc, item) => {
      const existing = acc.find((x) => x.operacao === item.operacao);
      if (existing) {
        existing.quantidade += item.quantidadeEncontrada;
        existing.excluido += item.totalExcluido;
      } else {
        acc.push({
          operacao: item.operacao,
          quantidade: item.quantidadeEncontrada,
          excluido: item.totalExcluido,
        });
      }
      return acc;
    },
    [] as any[]
  );

  const backlogByOperation = data.backlog.reduce(
    (acc, item) => {
      const existing = acc.find((x) => x.operation === item.operation);
      if (existing) {
        existing.backlog += item.backlog;
      } else {
        acc.push({
          operation: item.operation,
          backlog: item.backlog,
        });
      }
      return acc;
    },
    [] as any[]
  );

  const COLORS = [ShopeeColors.primary, ShopeeColors.primaryLight];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: ShopeeColors.lightGray,
        padding: '24px',
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: '700',
              color: ShopeeColors.textDark,
              margin: '0 0 8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Package size={36} color={ShopeeColors.primary} />
            Dashboard de Inventário LRJ07
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: ShopeeColors.textLight,
              margin: '0',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Calendar size={16} />
            Última atualização: {lastUpdate || 'Carregando...'}
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div
        style={{
          marginBottom: '32px',
          backgroundColor: ShopeeColors.white,
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2
          style={{
            fontSize: '18px',
            fontWeight: '600',
            color: ShopeeColors.textDark,
            margin: '0 0 16px 0',
          }}
        >
          Carregar Planilha
        </h2>
        <FileUpload onUpload={handleUpload} isLoading={isLoading} />
      </div>

      {/* Metrics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <MetricCard
          title="Total Missing"
          value={totalMissing}
          icon={<AlertCircle size={24} />}
          color={ShopeeColors.error}
        />
        <MetricCard
          title="Total Comercial"
          value={totalComercial}
          icon={<TrendingUp size={24} />}
          color={ShopeeColors.success}
        />
        <MetricCard
          title="Total Backlog"
          value={totalBacklog}
          icon={<Package size={24} />}
          color={ShopeeColors.warning}
        />
        <MetricCard
          title="Total Justificativas"
          value={totalJustificativas}
          icon={<CheckCircle size={24} />}
          color={ShopeeColors.info}
        />
      </div>

      {/* Charts Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        {/* Missing by Operation */}
        <div
          style={{
            backgroundColor: ShopeeColors.white,
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: `1px solid ${ShopeeColors.border}`,
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '600',
              color: ShopeeColors.textDark,
              margin: '0 0 16px 0',
            }}
          >
            Missing por Operação
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={missingByOperation}>
              <CartesianGrid strokeDasharray="3 3" stroke={ShopeeColors.border} />
              <XAxis dataKey="operacao" stroke={ShopeeColors.textLight} />
              <YAxis stroke={ShopeeColors.textLight} />
              <Tooltip
                contentStyle={{
                  backgroundColor: ShopeeColors.white,
                  border: `1px solid ${ShopeeColors.border}`,
                  borderRadius: '6px',
                }}
              />
              <Legend />
              <Bar dataKey="quantidade" fill={ShopeeColors.primary} name="Quantidade Encontrada" />
              <Bar dataKey="excluido" fill={ShopeeColors.error} name="Total Excluído" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Backlog by Operation */}
        <div
          style={{
            backgroundColor: ShopeeColors.white,
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: `1px solid ${ShopeeColors.border}`,
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '600',
              color: ShopeeColors.textDark,
              margin: '0 0 16px 0',
            }}
          >
            Backlog por Operação
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={backlogByOperation}
                dataKey="backlog"
                nameKey="operation"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {backlogByOperation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: ShopeeColors.white,
                  border: `1px solid ${ShopeeColors.border}`,
                  borderRadius: '6px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data Tables */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '16px',
        }}
      >
        <Tabs
          tabs={[
            { id: 'missing', label: 'Missing', icon: <AlertCircle size={16} /> },
            { id: 'comercial', label: 'Comercial', icon: <TrendingUp size={16} /> },
            { id: 'justificativas', label: 'Justificativas', icon: <CheckCircle size={16} /> },
            { id: 'backlog', label: 'Backlog', icon: <Package size={16} /> },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Missing Table */}
        {activeTab === 'missing' && (
          <DataTable
            title="Dados de Missing"
            columns={[
              { key: 'data', label: 'Data', width: '120px' },
              { key: 'operacao', label: 'Operação', width: '100px' },
              { key: 'quantidadeEncontrada', label: 'Quantidade Encontrada', width: '150px' },
              { key: 'totalExcluido', label: 'Total Excluído', width: '150px' },
            ]}
            data={data.missing}
          />
        )}

        {/* Comercial Table */}
        {activeTab === 'comercial' && (
          <DataTable
            title="Dados Comerciais"
            columns={[
              { key: 'data', label: 'Data', width: '120px' },
              { key: 'total', label: 'Total', width: '150px' },
            ]}
            data={data.comercial}
          />
        )}

        {/* Justificativas Table */}
        {activeTab === 'justificativas' && (
          <DataTable
            title="Justificativas"
            columns={[
              { key: 'data', label: 'Data', width: '120px' },
              { key: 'operacao', label: 'Operação', width: '100px' },
              { key: 'tratativa', label: 'Tratativa', width: '300px' },
              { key: 'total', label: 'Total', width: '100px' },
            ]}
            data={data.justificativas}
          />
        )}

        {/* Backlog Table */}
        {activeTab === 'backlog' && (
          <DataTable
            title="Backlog"
            columns={[
              { key: 'data', label: 'Data', width: '120px' },
              { key: 'operation', label: 'Operação', width: '100px' },
              { key: 'backlog', label: 'Backlog', width: '150px' },
            ]}
            data={data.backlog}
          />
        )}
      </div>
    </div>
  );
};
