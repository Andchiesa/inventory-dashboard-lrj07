import React from 'react';
import { ShopeeColors } from '../styles/colors';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  color = ShopeeColors.primary,
  trend,
}) => {
  return (
    <div
      style={{
        backgroundColor: ShopeeColors.white,
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: `1px solid ${ShopeeColors.border}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p
            style={{
              fontSize: '14px',
              color: ShopeeColors.textLight,
              margin: '0',
              fontWeight: '500',
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontSize: '28px',
              fontWeight: '700',
              color: ShopeeColors.textDark,
              margin: '8px 0 0 0',
            }}
          >
            {value}
          </p>
        </div>
        {icon && (
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              backgroundColor: `${color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: color,
            }}
          >
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div
          style={{
            fontSize: '12px',
            color: trend.isPositive ? ShopeeColors.success : ShopeeColors.error,
            fontWeight: '500',
          }}
        >
          {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% em relação ao período anterior
        </div>
      )}
    </div>
  );
};
