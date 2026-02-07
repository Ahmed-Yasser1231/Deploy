import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, DollarSign, ArrowRight } from 'lucide-react';
import type { Project } from '../../types';
import { formatCurrency, getIndustryLabel, getRiskLevelColor } from '../../data/mockData';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
  showActions?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, showActions = true }) => {
  const fundingProgress = (project.fundingRaised / project.fundingGoal) * 100;

  return (
    <div className="project-card">
      <div className="card-image">
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.name} />
        ) : (
          <div className="image-placeholder">
            <span>{project.name.charAt(0)}</span>
          </div>
        )}
        <div className="card-badges">
          <span className="industry-badge">{getIndustryLabel(project.industry)}</span>
          <span 
            className="risk-badge"
            style={{ backgroundColor: getRiskLevelColor(project.riskLevel) }}
          >
            {project.riskLevel} risk
          </span>
        </div>
      </div>

      <div className="card-content">
        <h3 className="project-name">{project.name}</h3>
        <p className="project-description">{project.description}</p>

        <div className="project-stats">
          <div className="stat">
            <TrendingUp size={16} />
            <span>{project.marketGrowthPrediction}% growth</span>
          </div>
          <div className="stat">
            <Users size={16} />
            <span>{project.founders.length} founder{project.founders.length > 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="funding-section">
          <div className="funding-header">
            <span className="funding-label">Funding Progress</span>
            <span className="funding-amount">
              {formatCurrency(project.fundingRaised)} / {formatCurrency(project.fundingGoal)}
            </span>
          </div>
          <div className="funding-bar">
            <div 
              className="funding-progress" 
              style={{ width: `${Math.min(fundingProgress, 100)}%` }}
            />
          </div>
          <div className="funding-footer">
            <span className="equity-offered">
              <DollarSign size={14} />
              {project.equityOffered}% equity offered
            </span>
            <span className="funding-percent">{fundingProgress.toFixed(0)}% funded</span>
          </div>
        </div>

        {showActions && (
          <div className="card-actions">
            <Link to={`/projects/${project.id}`} className="view-btn">
              View Details
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
