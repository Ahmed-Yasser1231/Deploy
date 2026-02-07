import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  TrendingUp, 
  Calendar,
  MapPin,
  Building,
  AlertTriangle,
  CheckCircle,
  FileText,
  MessageSquare,
  Heart,
  Share2,
  ExternalLink,
  Download
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { mockProjects, formatCurrency, formatDate, getIndustryLabel, getRiskLevelColor } from '../../data/mockData';
import './Projects.css';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user: _user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'documents' | 'team'>('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  const project = mockProjects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="not-found">
        <h2>Project not found</h2>
        <Link to="/explore">Back to projects</Link>
      </div>
    );
  }

  const fundingProgress = (project.fundingRaised / project.fundingGoal) * 100;

  const revenueExpenseData = project.financials.revenue.map((rev, i) => ({
    month: rev.month,
    revenue: rev.value,
    expenses: project.financials.expenses[i].value,
    profit: project.financials.profit[i].value
  }));

  const projectedData = [
    ...project.financials.revenue,
    ...project.financials.projectedRevenue
  ];

  return (
    <div className="project-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="project-header">
        <div className="header-top">
          <div className="project-thumbnail">
            {project.thumbnail ? (
              <img src={project.thumbnail} alt={project.name} />
            ) : (
              <div className="thumbnail-placeholder">{project.name.charAt(0)}</div>
            )}
          </div>
          <div className="header-info">
            <h1>{project.name}</h1>
            <div className="tags">
              <span className="industry-tag">{getIndustryLabel(project.industry)}</span>
              <span className="stage-tag">{project.stage.replace('-', ' ')}</span>
              <span 
                className="risk-tag"
                style={{ backgroundColor: getRiskLevelColor(project.riskLevel) }}
              >
                {project.riskLevel === 'low' && <CheckCircle size={14} />}
                {project.riskLevel !== 'low' && <AlertTriangle size={14} />}
                {project.riskLevel} risk
              </span>
            </div>
            <p className="project-tagline">{project.description}</p>
          </div>
        </div>
        
        <div className="header-bottom">
          <div className="meta-info">
            <span><Calendar size={16} /> Founded {formatDate(project.createdAt)}</span>
            <span><MapPin size={16} /> Egypt</span>
            <span><Building size={16} /> {project.founders.length} Founder{project.founders.length > 1 ? 's' : ''}</span>
          </div>
          <div className="header-actions">
            <button 
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => setIsFavorite(!isFavorite)}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={20} fill={isFavorite ? '#ef4444' : 'none'} />
            </button>
            <button className="share-btn" title="Share project">
              <Share2 size={20} />
            </button>
            <Link to={`/messages?project=${project.id}`} className="contact-btn">
              <MessageSquare size={20} />
              Contact Founder
            </Link>
          </div>
        </div>
      </div>

      <div className="funding-overview">
        <div className="funding-stats">
          <div className="stat-item">
            <span className="stat-label">Funding Goal</span>
            <span className="stat-value">{formatCurrency(project.fundingGoal)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Raised</span>
            <span className="stat-value highlight">{formatCurrency(project.fundingRaised)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Equity Offered</span>
            <span className="stat-value">{project.equityOffered}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Market Growth</span>
            <span className="stat-value growth">
              <TrendingUp size={18} />
              {project.marketGrowthPrediction}%
            </span>
          </div>
        </div>
        <div className="funding-progress-section">
          <div className="progress-header">
            <span>Progress</span>
            <span className="progress-percent">{fundingProgress.toFixed(1)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${Math.min(fundingProgress, 100)}%` }} />
          </div>
        </div>
      </div>

      <div className="tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'financials' ? 'active' : ''}
          onClick={() => setActiveTab('financials')}
        >
          Financials
        </button>
        <button 
          className={activeTab === 'team' ? 'active' : ''}
          onClick={() => setActiveTab('team')}
        >
          Team
        </button>
        <button 
          className={activeTab === 'documents' ? 'active' : ''}
          onClick={() => setActiveTab('documents')}
        >
          Documents
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="content-grid">
              <div className="main-section">
                <div className="section-card">
                  <h3>About the Project</h3>
                  <p>{project.description}</p>
                  <p>
                    Our platform leverages cutting-edge technology to address critical market needs. 
                    We've identified a significant opportunity in the {getIndustryLabel(project.industry).toLowerCase()} sector 
                    and are positioned to capture substantial market share with our innovative approach.
                  </p>
                </div>

                <div className="section-card">
                  <h3>Market Opportunity</h3>
                  <div className="market-stats">
                    <div className="market-stat">
                      <span className="market-label">Target Market</span>
                      <span className="market-value">{project.targetMarket}</span>
                    </div>
                    <div className="market-stat">
                      <span className="market-label">Market Size (TAM)</span>
                      <span className="market-value">{formatCurrency(project.marketSize)}</span>
                    </div>
                    <div className="market-stat">
                      <span className="market-label">Predicted Growth</span>
                      <span className="market-value growth">
                        <TrendingUp size={16} />
                        {project.marketGrowthPrediction}% annually
                      </span>
                    </div>
                  </div>
                </div>

                <div className="section-card">
                  <h3>AI Risk Assessment</h3>
                  <div className="risk-assessment">
                    <div className="risk-meter">
                      <div 
                        className="risk-indicator"
                        style={{ 
                          left: `${project.riskLevel === 'low' ? 20 : project.riskLevel === 'medium' ? 50 : 80}%`,
                          backgroundColor: getRiskLevelColor(project.riskLevel)
                        }}
                      />
                      <div className="risk-labels">
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                      </div>
                    </div>
                    <div className="risk-factors">
                      <h4>Key Risk Factors</h4>
                      <ul>
                        <li>Market competition level: Moderate</li>
                        <li>Team experience: Strong</li>
                        <li>Financial runway: 12 months</li>
                        <li>Regulatory risk: Low</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="side-section">
                <div className="section-card highlights">
                  <h3>Investment Highlights</h3>
                  <ul className="highlights-list">
                    <li>
                      <CheckCircle size={18} className="check-icon" />
                      <span>Strong market growth potential of {project.marketGrowthPrediction}%</span>
                    </li>
                    <li>
                      <CheckCircle size={18} className="check-icon" />
                      <span>Experienced founding team with industry expertise</span>
                    </li>
                    <li>
                      <CheckCircle size={18} className="check-icon" />
                      <span>Clear path to profitability</span>
                    </li>
                    <li>
                      <CheckCircle size={18} className="check-icon" />
                      <span>Scalable business model</span>
                    </li>
                  </ul>
                </div>

                <div className="section-card">
                  <h3>Quick Stats</h3>
                  <div className="quick-stats">
                    <div className="quick-stat">
                      <span className="qs-label">Industry</span>
                      <span className="qs-value">{getIndustryLabel(project.industry)}</span>
                    </div>
                    <div className="quick-stat">
                      <span className="qs-label">Stage</span>
                      <span className="qs-value">{project.stage.replace('-', ' ')}</span>
                    </div>
                    <div className="quick-stat">
                      <span className="qs-label">Team Size</span>
                      <span className="qs-value">{project.founders.length} founder{project.founders.length > 1 ? 's' : ''}</span>
                    </div>
                    <div className="quick-stat">
                      <span className="qs-label">Founded</span>
                      <span className="qs-value">{formatDate(project.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'financials' && (
          <div className="financials-tab">
            <div className="charts-grid">
              <div className="chart-card">
                <h3>Revenue & Expenses</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueExpenseData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                    <Tooltip 
                      formatter={(value: number | undefined, name: string | undefined) => {
                        if (value === undefined || name === undefined) return ['', name || ''];
                        return [formatCurrency(value), name.charAt(0).toUpperCase() + name.slice(1)];
                      }}
                      contentStyle={{ 
                        background: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="revenue" fill="#2563eb" name="Revenue" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3>Profit Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueExpenseData}>
                    <defs>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                    <Tooltip 
                      formatter={(value: number | undefined) => {
                        if (value === undefined) return ['', 'Profit'];
                        return [formatCurrency(value), 'Profit'];
                      }}
                      contentStyle={{ 
                        background: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="profit" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      fill="url(#colorProfit)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card full-width">
                <h3>Revenue Projection</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={projectedData}>
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
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#2563eb" 
                      strokeWidth={2}
                      dot={{ fill: '#2563eb', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="financial-summary">
              <h3>Financial Summary</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="summary-label">Current Monthly Revenue</span>
                  <span className="summary-value">{formatCurrency(project.financials.revenue[5].value)}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Current Monthly Expenses</span>
                  <span className="summary-value">{formatCurrency(project.financials.expenses[5].value)}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Current Monthly Profit</span>
                  <span className="summary-value profit">{formatCurrency(project.financials.profit[5].value)}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Cash Position</span>
                  <span className="summary-value">{formatCurrency(project.financials.cashFlow[5].value)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="team-tab">
            <h3>Founding Team</h3>
            <div className="team-grid">
              {project.founders.map((founder, index) => {
                const initials = founder.name
                  .split(' ')
                  .map(part => part[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <div key={index} className="team-card">
                    <div className="team-avatar">
                      {founder.avatar ? (
                        <img src={founder.avatar} alt={founder.name} />
                      ) : (
                        <div className="avatar-placeholder">{initials}</div>
                      )}
                    </div>
                    <div className="team-info">
                      <h4>{founder.name}</h4>
                      <span className="team-role">{founder.role}</span>
                      <p className="team-background">{founder.background}</p>
                      {founder.linkedIn && (
                        <a href={founder.linkedIn} target="_blank" rel="noopener noreferrer" className="linkedin-link">
                          <ExternalLink size={14} />
                          LinkedIn Profile
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="documents-tab">
            <h3>Project Documents</h3>
            {project.documents.length > 0 ? (
              <div className="documents-list">
                {project.documents.map(doc => (
                  <div key={doc.id} className="document-item">
                    <div className="doc-icon">
                      <FileText size={24} />
                    </div>
                    <div className="doc-info">
                      <h4>{doc.name}</h4>
                      <span className="doc-type">{doc.type.replace('-', ' ')}</span>
                      <span className="doc-date">Uploaded {formatDate(doc.uploadedAt)}</span>
                    </div>
                    <button className="download-btn">
                      <Download size={18} />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-documents">
                <FileText size={48} />
                <p>No documents available yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
