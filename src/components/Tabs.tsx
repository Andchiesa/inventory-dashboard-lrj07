import React from 'react';
import { ShopeeColors } from '../styles/colors';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        borderBottom: `2px solid ${ShopeeColors.border}`,
        backgroundColor: ShopeeColors.white,
        borderRadius: '8px 8px 0 0',
        padding: '0 16px',
        overflowX: 'auto',
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            padding: '12px 16px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: activeTab === tab.id ? '600' : '500',
            color: activeTab === tab.id ? ShopeeColors.primary : ShopeeColors.textLight,
            borderBottom: activeTab === tab.id ? `3px solid ${ShopeeColors.primary}` : 'none',
            marginBottom: '-2px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
            transition: 'all 0.3s ease',
          }}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};
