import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderKanban, 
  DollarSign, 
  Eye,
  MessageSquare,
  ArrowRight,
  Plus
} from 'lucide-react';
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import StatsCard from '../../components/StatsCard/StatsCard';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { mockProjects, formatCurrency, mockMatchRecommendations } from '../../data/mockData';
import './Dashboard.css';

const EntrepreneurDashboard: React.FC = () => {
  const { user } = useAuth();
  const myProjects = mockProjects.slice(0, 2);
  const projectFinancials = mockProjects[0].financials;

  const revenueData = [
    ...projectFinancials.revenue,
    ...projectFinancials.projectedRevenue.map(d => ({ ...d, projected: true }))
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.firstName}! 👋</h1>
          <p>Here's what's happening with your projects today.</p>
        </div>
        <Link to="/create-project" className="create-btn">
          <Plus size={20} />
          Create New Project
        </Link>
      </div>

      <div className="stats-grid">
        <StatsCard 
          title="Total Projects" 
          value="3" 
          change={12}
          icon={FolderKanban}
          color="blue"
        />
        <StatsCard 
          title="Total Funding Raised" 
          value={formatCurrency(125000)} 
          change={23}
          icon={DollarSign}
          color="green"
        />
        <StatsCard 
          title="Total Views" 
          value="2,847" 
          change={18}
          icon={Eye}
          color="purple"
        />
        <StatsCard 
          title="Investor Inquiries" 
          value="12" 
          change={45}
          icon={MessageSquare}
          color="orange"
        />
      </div>

      <div className="dashboard-content">
        <div className="main-content">
          <div className="chart-section">
            <div className="section-header">
              <h2>Revenue Overview</h2>
              <div className="chart-legend">
                <span className="legend-item">
                  <span className="legend-dot actual"></span>
                  Actual
                </span>
                <span className="legend-item">
                  <span className="legend-dot projected"></span>
                  Projected
                </span>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                  <Tooltip 
                    formatter={(value: number | undefined) => {
                      if (value === undefined) return ['', 'Revenue'];
                      return [formatCurrency(value), 'Revenue'];
                    }}
                    contentStyle={{ 
                      background: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="projects-section">
            <div className="section-header">
              <h2>My Projects</h2>
              <Link to="/my-projects" className="view-all-link">
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="projects-grid">
              {myProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>

        <div className="side-content">
          <div className="matches-section">
            <div className="section-header">
              <h2>Investor Matches</h2>
            </div>
            <div className="matches-list">
              {mockMatchRecommendations.slice(0, 3).map((match, index) => (
                <div key={index} className="match-card">
                  <div className="match-avatar">
                    <img 
                      src={`https://images.unsplash.com/photo-${1494790108377 + index}-be9c29b29330?w=100`} 
                      alt="Investor"
                    />
                  </div>
                  <div className="match-info">
                    <h4>Cairo Ventures</h4>
                    <p>Interested in {match.project?.name}</p>
                    <span className="match-score">{match.matchScore}% match</span>
                  </div>
                  <Link to="/messages" className="chat-btn">
                    <MessageSquare size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="activity-section">
            <div className="section-header">
              <h2>Recent Activity</h2>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon green">
                  <DollarSign size={16} />
                </div>
                <div className="activity-content">
                  <p>New investment of <strong>$15,000</strong></p>
                  <span>2 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon blue">
                  <Eye size={16} />
                </div>
                <div className="activity-content">
                  <p>Project viewed by <strong>5 investors</strong></p>
                  <span>4 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon purple">
                  <MessageSquare size={16} />
                </div>
                <div className="activity-content">
                  <p>New message from <strong>Sarah Ahmed</strong></p>
                  <span>Yesterday</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurDashboard;
