import React from 'react';
import { ShopeeColors } from '../styles/colors';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  width?: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  title?: string;
  maxHeight?: string;
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  title,
  maxHeight = '400px',
}) => {
  return (
    <div
      style={{
        backgroundColor: ShopeeColors.white,
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: `1px solid ${ShopeeColors.border}`,
        overflow: 'hidden',
      }}
    >
      {title && (
        <div
          style={{
            padding: '16px 20px',
            borderBottom: `1px solid ${ShopeeColors.border}`,
            backgroundColor: ShopeeColors.lightGray,
          }}
        >
          <h3
            style={{
              margin: '0',
              fontSize: '16px',
              fontWeight: '600',
              color: ShopeeColors.textDark,
            }}
          >
            {title}
          </h3>
        </div>
      )}

      <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: ShopeeColors.lightGray }}>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: ShopeeColors.textDark,
                    borderBottom: `1px solid ${ShopeeColors.border}`,
                    width: column.width,
                  }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    padding: '32px 16px',
                    textAlign: 'center',
                    color: ShopeeColors.textLight,
                  }}
                >
                  Nenhum dado disponível
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  style={{
                    backgroundColor: rowIndex % 2 === 0 ? ShopeeColors.white : ShopeeColors.lightGray,
                    borderBottom: `1px solid ${ShopeeColors.border}`,
                  }}
                >
                  {columns.map((column) => (
                    <td
                      key={`${rowIndex}-${column.key}`}
                      style={{
                        padding: '12px 16px',
                        color: ShopeeColors.textDark,
                      }}
                    >
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
