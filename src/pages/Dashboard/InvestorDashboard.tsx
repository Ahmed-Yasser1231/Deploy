import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderKanban, 
  DollarSign, 
  TrendingUp, 
  Heart,
  PieChart,
  ArrowRight,
  Star,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { 
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import StatsCard from '../../components/StatsCard/StatsCard';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { mockProjects, formatCurrency, mockMatchRecommendations, getIndustryLabel } from '../../data/mockData';
import './Dashboard.css';

const InvestorDashboard: React.FC = () => {
  const { user } = useAuth();
  const recommendations = mockMatchRecommendations;

  const portfolioData = [
    { name: 'Technology', value: 45, color: '#2563eb' },
    { name: 'Healthcare', value: 25, color: '#10b981' },
    { name: 'FinTech', value: 20, color: '#7c3aed' },
    { name: 'Other', value: 10, color: '#f59e0b' }
  ];

  const investmentData = [
    { month: 'Jan', invested: 50000, returns: 5000 },
    { month: 'Feb', invested: 75000, returns: 8000 },
    { month: 'Mar', invested: 120000, returns: 15000 },
    { month: 'Apr', invested: 150000, returns: 22000 },
    { month: 'May', invested: 180000, returns: 30000 },
    { month: 'Jun', invested: 225000, returns: 42000 }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.firstName}! 👋</h1>
          <p>Discover new investment opportunities tailored for you.</p>
        </div>
        <Link to="/explore" className="create-btn">
          <FolderKanban size={20} />
          Explore Projects
        </Link>
      </div>

      <div className="stats-grid">
        <StatsCard 
          title="Total Invested" 
          value={formatCurrency(225000)} 
          change={25}
          icon={DollarSign}
          color="blue"
        />
        <StatsCard 
          title="Portfolio Value" 
          value={formatCurrency(267000)} 
          change={18.7}
          icon={TrendingUp}
          color="green"
        />
        <StatsCard 
          title="Active Investments" 
          value="8" 
          change={14}
          icon={FolderKanban}
          color="purple"
        />
        <StatsCard 
          title="New Matches" 
          value="15" 
          change={32}
          icon={Heart}
          color="orange"
        />
      </div>

      <div className="dashboard-content investor-dashboard">
        <div className="main-content">
          <div className="chart-section">
            <div className="section-header">
              <h2>Investment Performance</h2>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={investmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      formatCurrency(value), 
                      name === 'invested' ? 'Invested' : 'Returns'
                    ]}
                    contentStyle={{ 
                      background: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="invested" fill="#2563eb" name="Invested" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="returns" fill="#10b981" name="Returns" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="recommendations-section">
            <div className="section-header">
              <h2>Recommended for You</h2>
              <Link to="/recommendations" className="view-all-link">
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="recommendations-list">
              {recommendations.map((rec) => (
                <div key={rec.id} className="recommendation-card">
                  <div className="rec-header">
                    <div className="rec-image">
                      {rec.project?.thumbnail ? (
                        <img src={rec.project.thumbnail} alt={rec.project.name} />
                      ) : (
                        <div className="rec-placeholder">{rec.project?.name.charAt(0)}</div>
                      )}
                    </div>
                    <div className="rec-info">
                      <h3>{rec.project?.name}</h3>
                      <span className="rec-industry">{getIndustryLabel(rec.project?.industry || '')}</span>
                    </div>
                    <div className="match-badge">
                      <Star size={14} />
                      {rec.matchScore}%
                    </div>
                  </div>
                  <p className="rec-description">{rec.project?.description}</p>
                  <div className="rec-metrics">
                    <div className="metric">
                      <TrendingUp size={14} />
                      <span>{rec.project?.marketGrowthPrediction}% growth</span>
                    </div>
                    <div className="metric">
                      <span 
                        className={`risk-indicator ${rec.project?.riskLevel}`}
                      >
                        {rec.project?.riskLevel === 'low' && <CheckCircle size={14} />}
                        {rec.project?.riskLevel === 'medium' && <AlertTriangle size={14} />}
                        {rec.project?.riskLevel === 'high' && <AlertTriangle size={14} />}
                        {rec.project?.riskLevel} risk
                      </span>
                    </div>
                  </div>
                  <div className="rec-reasons">
                    {rec.reasons.slice(0, 2).map((reason, i) => (
                      <span key={i} className="reason-tag">{reason}</span>
                    ))}
                  </div>
                  <div className="rec-footer">
                    <div className="funding-info">
                      <span className="funding-goal">{formatCurrency(rec.project?.fundingGoal || 0)}</span>
                      <span className="equity">{rec.project?.equityOffered}% equity</span>
                    </div>
                    <Link to={`/projects/${rec.project?.id}`} className="view-btn">
                      View Project
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="side-content">
          <div className="portfolio-section">
            <div className="section-header">
              <h2>Portfolio Distribution</h2>
            </div>
            <div className="pie-chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <RechartsPieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="pie-legend">
                {portfolioData.map((item, index) => (
                  <div key={index} className="legend-item">
                    <span className="legend-color" style={{ background: item.color }}></span>
                    <span className="legend-name">{item.name}</span>
                    <span className="legend-value">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="trending-section">
            <div className="section-header">
              <h2>Trending Projects</h2>
            </div>
            <div className="trending-list">
              {mockProjects.slice(0, 4).map((project, index) => (
                <Link key={project.id} to={`/projects/${project.id}`} className="trending-item">
                  <span className="trending-rank">{index + 1}</span>
                  <div className="trending-info">
                    <h4>{project.name}</h4>
                    <span>{getIndustryLabel(project.industry)}</span>
                  </div>
                  <div className="trending-growth">
                    <TrendingUp size={14} />
                    {project.marketGrowthPrediction}%
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
