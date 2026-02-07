import React from 'react';
import { MapPin, Briefcase, Link as LinkIcon, Mail, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MyProfile: React.FC = () => {
  const { user } = useAuth();

  const fullName = `${user?.firstName || 'User'} ${user?.lastName || ''}`.trim();
  const headline = user?.role === 'entrepreneur'
    ? 'Founder | Building scalable products'
    : 'Investor | Supporting high-growth startups';

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-cover" />
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.avatar ? (
              <img src={user.avatar} alt={fullName} />
            ) : (
              <span>{fullName.charAt(0)}</span>
            )}
          </div>
          <div className="profile-header-info">
            <h1 style={{ marginTop: '20px' }}>{fullName}</h1>
            <p style={{ color: 'black' , marginTop: '10px'}} className="profile-headline">{headline}</p>
            <div className="profile-meta">
              <span style={{ color: 'black' }}><MapPin size={14} /> Egypt</span>
              <span style={{ color: 'black' }}><Briefcase size={14} /> {user?.company || 'Independent'}</span>
            </div>
            <div className="profile-actions">
              <button className="primary-btn">Edit Profile</button>
              <button className="secondary-btn">Share</button>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>About</h2>
          <p>{user?.bio || 'Add a short summary about your background and goals.'}</p>
        </div>

        <div className="profile-section">
          <h2>Experience</h2>
          <div className="profile-item">
            <h3>{user?.company || 'Company Name'}</h3>
            <p>{user?.experience || 'Add your role and achievements here.'}</p>
          </div>
        </div>

        <div className="profile-section">
          <h2>Education</h2>
          <div className="profile-item">
            <h3>University / Program</h3>
            <p>Add your education details.</p>
          </div>
        </div>

        <div className="profile-section">
          <h2>Skills</h2>
          <div className="profile-skills">
            <span>Leadership</span>
            <span>Product Strategy</span>
            <span>Fundraising</span>
            <span>Growth</span>
          </div>
        </div>

        <div className="profile-section">
          <h2>Contact</h2>
          <div className="profile-contact">
            <span><Mail size={14} /> {user?.email || 'email@example.com'}</span>
            <span><Phone size={14} /> {user?.phone || '+20 000 000 0000'}</span>
            <span><LinkIcon size={14} /> {user?.linkedIn || 'linkedin.com/in/username'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
