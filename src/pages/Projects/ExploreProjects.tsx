import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { mockProjects, getIndustryLabel } from '../../data/mockData';
import type { Industry, ProjectStage, RiskLevel } from '../../types';
import './Projects.css';
import { useAuth } from '../../context/AuthContext';

const ExploreProjects: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    industries: [] as Industry[],
    stages: [] as ProjectStage[],
    riskLevels: [] as RiskLevel[],
    fundingRange: { min: 0, max: 1000000 }
  });

  const industries: Industry[] = ['technology', 'healthcare', 'fintech', 'e-commerce', 'education', 'agriculture'];
  const stages: ProjectStage[] = ['idea', 'mvp', 'early-stage', 'growth', 'expansion'];
  const riskLevels: RiskLevel[] = ['low', 'medium', 'high'];

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = filters.industries.length === 0 || filters.industries.includes(project.industry);
    const matchesStage = filters.stages.length === 0 || filters.stages.includes(project.stage);
    const matchesRisk = filters.riskLevels.length === 0 || filters.riskLevels.includes(project.riskLevel);
    const matchesFunding = project.fundingGoal >= filters.fundingRange.min && 
                           project.fundingGoal <= filters.fundingRange.max;
    
    return matchesSearch && matchesIndustry && matchesStage && matchesRisk && matchesFunding;
  });

  const toggleFilter = (type: 'industries' | 'stages' | 'riskLevels', value: any) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  };

  return (
    <div className="explore-page">
      <div className="explore-header">
        <div className="header-content">
          <h1>Welcome back, {user?.firstName}! 👋</h1>
          <p>Discover innovative projects that match your investment criteria</p>
        </div>
      </div>

      <div className="explore-controls">
        <div className="search-filter-row">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text"
              placeholder="Search projects by name, industry, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className={`filter-btn ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            Filters
            <ChevronDown size={16} className={showFilters ? 'rotate' : ''} />
          </button>
          <div className="view-toggle">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <h4>Industry</h4>
              <div className="filter-options">
                {industries.map(industry => (
                  <button
                    key={industry}
                    className={`filter-chip ${filters.industries.includes(industry) ? 'active' : ''}`}
                    onClick={() => toggleFilter('industries', industry)}
                  >
                    {getIndustryLabel(industry)}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <h4>Project Stage</h4>
              <div className="filter-options">
                {stages.map(stage => (
                  <button
                    key={stage}
                    className={`filter-chip ${filters.stages.includes(stage) ? 'active' : ''}`}
                    onClick={() => toggleFilter('stages', stage)}
                  >
                    {stage.charAt(0).toUpperCase() + stage.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <h4>Risk Level</h4>
              <div className="filter-options">
                {riskLevels.map(risk => (
                  <button
                    key={risk}
                    className={`filter-chip risk-${risk} ${filters.riskLevels.includes(risk) ? 'active' : ''}`}
                    onClick={() => toggleFilter('riskLevels', risk)}
                  >
                    {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="explore-results">
        <div className="results-header">
          <span className="results-count">{filteredProjects.length} projects found</span>
          <select className="sort-select">
            <option value="newest">Newest First</option>
            <option value="funding">Highest Funding Goal</option>
            <option value="growth">Highest Growth Prediction</option>
            <option value="match">Best Match</option>
          </select>
        </div>

        <div className={`projects-grid ${viewMode}`}>
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No projects found</h3>
            <p>Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreProjects;
