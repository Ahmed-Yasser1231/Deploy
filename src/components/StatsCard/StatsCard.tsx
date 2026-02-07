import React from 'react';
import type { LucideIcon } from 'lucide-react';
import './StatsCard.css';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon: Icon, color }) => {
  return (
    <div className={`stats-card stats-card-${color}`}>
      <div className="stats-icon">
        <Icon size={24} />
      </div>
      <div className="stats-content">
        <span className="stats-title">{title}</span>
        <span className="stats-value">{value}</span>
        {change !== undefined && (
          <span className={`stats-change ${change >= 0 ? 'positive' : 'negative'}`}>
            {change >= 0 ? '+' : ''}{change}% from last month
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
