import React from 'react';
import { Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { mockMatchRecommendations } from '../../data/mockData';
import './Recommendations.css';

const Recommendations: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="recommendations-page">
      <div className="recommendations-header">
        <h1>Recommended for you, {user?.firstName || 'Investor'} 👋</h1>
        <p>Projects matched to your profile and preferences.</p>
      </div>

      <div className="recommendations-grid">
        {mockMatchRecommendations.map((rec) => (
          <div key={rec.id} className="recommendation-item">
            <div className="match-badge">
              <Star size={14} />
              {rec.matchScore}%
            </div>
            {rec.project && <ProjectCard project={rec.project} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
