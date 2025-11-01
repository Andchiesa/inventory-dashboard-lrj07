import React, { useRef, useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { ShopeeColors } from '../styles/colors';

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  isLoading: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUpload, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setUploadStatus('error');
      setStatusMessage('Por favor, envie um arquivo Excel (.xlsx ou .xls)');
      return;
    }

    try {
      setUploadStatus('idle');
      await onUpload(file);
      setUploadStatus('success');
      setStatusMessage('Arquivo enviado com sucesso!');
      setTimeout(() => setUploadStatus('idle'), 3000);
    } catch (error) {
      setUploadStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'Erro ao enviar arquivo');
    }
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          backgroundColor: dragActive ? ShopeeColors.lightGray : ShopeeColors.white,
          borderColor: dragActive ? ShopeeColors.primary : ShopeeColors.border,
          borderWidth: '2px',
          borderStyle: 'dashed',
          borderRadius: '8px',
          padding: '32px',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleChange}
          style={{ display: 'none' }}
          disabled={isLoading}
        />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <Upload
            size={48}
            color={ShopeeColors.primary}
            style={{ opacity: isLoading ? 0.5 : 1 }}
          />
          <div>
            <p
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: ShopeeColors.textDark,
                margin: '0 0 4px 0',
              }}
            >
              {isLoading ? 'Enviando arquivo...' : 'Arraste a planilha aqui ou clique para selecionar'}
            </p>
            <p
              style={{
                fontSize: '14px',
                color: ShopeeColors.textLight,
                margin: '0',
              }}
            >
              Formato aceito: .xlsx ou .xls
            </p>
          </div>
        </div>
      </div>

      {uploadStatus !== 'idle' && (
        <div
          style={{
            marginTop: '16px',
            padding: '12px 16px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor:
              uploadStatus === 'success'
                ? '#D4EDDA'
                : uploadStatus === 'error'
                  ? '#F8D7DA'
                  : ShopeeColors.lightGray,
            color:
              uploadStatus === 'success'
                ? ShopeeColors.success
                : uploadStatus === 'error'
                  ? ShopeeColors.error
                  : ShopeeColors.textDark,
          }}
        >
          {uploadStatus === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span style={{ fontSize: '14px', fontWeight: '500' }}>{statusMessage}</span>
        </div>
      )}
    </div>
  );
};
