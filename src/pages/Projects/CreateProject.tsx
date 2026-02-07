import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  ArrowRight,
  Save,
  Upload,
  Plus,
  Trash2,
  Info
} from 'lucide-react';
import type { Industry, ProjectStage } from '../../types';
import { getIndustryLabel } from '../../data/mockData';
import './Projects.css';

interface FormData {
  name: string;
  description: string;
  industry: Industry | '';
  stage: ProjectStage | '';
  fundingGoal: number;
  equityOffered: number;
  targetMarket: string;
  marketSize: number;
  founders: Array<{
    name: string;
    role: string;
    background: string;
    linkedIn?: string;
  }>;
  financials: {
    monthlyRevenue: number;
    monthlyExpenses: number;
    runway: number;
  };
}

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    industry: '',
    stage: '',
    fundingGoal: 0,
    equityOffered: 0,
    targetMarket: '',
    marketSize: 0,
    founders: [{ name: '', role: '', background: '', linkedIn: '' }],
    financials: {
      monthlyRevenue: 0,
      monthlyExpenses: 0,
      runway: 0
    }
  });

  const industries: Industry[] = ['technology', 'healthcare', 'fintech', 'e-commerce', 'education', 'agriculture', 'real-estate', 'manufacturing', 'energy', 'entertainment'];
  const stages: ProjectStage[] = ['idea', 'mvp', 'early-stage', 'growth', 'expansion'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFounderChange = (index: number, field: string, value: string) => {
    const newFounders = [...formData.founders];
    newFounders[index] = { ...newFounders[index], [field]: value };
    setFormData(prev => ({ ...prev, founders: newFounders }));
  };

  const addFounder = () => {
    setFormData(prev => ({
      ...prev,
      founders: [...prev.founders, { name: '', role: '', background: '', linkedIn: '' }]
    }));
  };

  const removeFounder = (index: number) => {
    if (formData.founders.length > 1) {
      setFormData(prev => ({
        ...prev,
        founders: prev.founders.filter((_, i) => i !== index)
      }));
    }
  };

  const handleFinancialsChange = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      financials: { ...prev.financials, [field]: value }
    }));
  };

  const handleSubmit = () => {
    // Simulate submission
    alert('Project submitted for review!');
    navigate('/my-projects');
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="create-project-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="create-header">
        <h1>Create New Project</h1>
        <p>Share your startup with potential investors</p>
      </div>

      <div className="progress-steps">
        <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
          <span className="step-number">1</span>
          <span className="step-label">Basic Info</span>
        </div>
        <div className="step-connector" />
        <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
          <span className="step-number">2</span>
          <span className="step-label">Team</span>
        </div>
        <div className="step-connector" />
        <div className={`progress-step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
          <span className="step-number">3</span>
          <span className="step-label">Financials</span>
        </div>
        <div className="step-connector" />
        <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>
          <span className="step-number">4</span>
          <span className="step-label">Review</span>
        </div>
      </div>

      <div className="form-container">
        {step === 1 && (
          <div className="form-step">
            <h2>Project Information</h2>
            <p className="step-description">Tell us about your startup and what makes it unique</p>

            <div className="form-group">
              <label htmlFor="name">Project Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your project name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Project Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project, its value proposition, and what problem it solves..."
                rows={5}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="industry">Industry *</label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                >
                  <option value="">Select industry</option>
                  {industries.map(ind => (
                    <option key={ind} value={ind}>{getIndustryLabel(ind)}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="stage">Project Stage *</label>
                <select
                  id="stage"
                  name="stage"
                  value={formData.stage}
                  onChange={handleChange}
                >
                  <option value="">Select stage</option>
                  {stages.map(stage => (
                    <option key={stage} value={stage}>
                      {stage.charAt(0).toUpperCase() + stage.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fundingGoal">Funding Goal *</label>
                <input
                  type="number"
                  id="fundingGoal"
                  name="fundingGoal"
                  value={formData.fundingGoal || ''}
                  onChange={handleChange}
                  placeholder="250000"
                />
              </div>
              <div className="form-group">
                <label htmlFor="equityOffered">Equity Offered (%) *</label>
                <input
                  type="number"
                  id="equityOffered"
                  name="equityOffered"
                  value={formData.equityOffered || ''}
                  onChange={handleChange}
                  placeholder="15"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="targetMarket">Target Market *</label>
              <input
                type="text"
                id="targetMarket"
                name="targetMarket"
                value={formData.targetMarket}
                onChange={handleChange}
                placeholder="e.g., B2B - SMEs in MENA region"
              />
            </div>

            <div className="form-group">
              <label htmlFor="marketSize">Market Size *</label>
              <input
                type="number"
                id="marketSize"
                name="marketSize"
                value={formData.marketSize || ''}
                onChange={handleChange}
                placeholder="5000000000"
              />
              <span className="input-hint">Total Addressable Market (TAM)</span>
            </div>

            <div className="form-group">
              <label>Project Thumbnail</label>
              <div className="upload-area">
                <Upload size={32} />
                <p>Drag & drop an image or click to upload</p>
                <span>Recommended: 800x450px, Max 5MB</span>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <h2>Founding Team</h2>
            <p className="step-description">Introduce the people behind your startup</p>

            {formData.founders.map((founder, index) => (
              <div key={index} className="founder-card">
                <div className="founder-header">
                  <h4>Founder {index + 1}</h4>
                  {formData.founders.length > 1 && (
                    <button 
                      type="button" 
                      className="remove-btn"
                      onClick={() => removeFounder(index)}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={founder.name}
                      onChange={(e) => handleFounderChange(index, 'name', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="form-group">
                    <label>Role *</label>
                    <input
                      type="text"
                      value={founder.role}
                      onChange={(e) => handleFounderChange(index, 'role', e.target.value)}
                      placeholder="CEO, CTO, etc."
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Professional Background *</label>
                  <textarea
                    value={founder.background}
                    onChange={(e) => handleFounderChange(index, 'background', e.target.value)}
                    placeholder="Brief description of experience and qualifications..."
                    rows={3}
                  />
                </div>
                <div className="form-group">
                  <label>LinkedIn Profile (Optional)</label>
                  <input
                    type="url"
                    value={founder.linkedIn || ''}
                    onChange={(e) => handleFounderChange(index, 'linkedIn', e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>
            ))}

            <button type="button" className="add-founder-btn" onClick={addFounder}>
              <Plus size={18} />
              Add Another Founder
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <h2>Financial Information</h2>
            <p className="step-description">Share your current financial metrics</p>

            <div className="info-banner">
              <Info size={20} />
              <p>
                This information will be used to generate your financial dashboard and help 
                our AI assess your project's risk level and growth potential.
              </p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Current Monthly Revenue</label>
                <input
                  type="number"
                  value={formData.financials.monthlyRevenue || ''}
                  onChange={(e) => handleFinancialsChange('monthlyRevenue', Number(e.target.value))}
                  placeholder="50000"
                />
              </div>
              <div className="form-group">
                <label>Current Monthly Expenses</label>
                <input
                  type="number"
                  value={formData.financials.monthlyExpenses || ''}
                  onChange={(e) => handleFinancialsChange('monthlyExpenses', Number(e.target.value))}
                  placeholder="35000"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Current Runway (Months)</label>
              <input
                type="number"
                value={formData.financials.runway || ''}
                onChange={(e) => handleFinancialsChange('runway', Number(e.target.value))}
                placeholder="12"
              />
              <span className="input-hint">How many months can you operate with current funds?</span>
            </div>

            <div className="form-group">
              <label>Financial Documents</label>
              <div className="upload-area">
                <Upload size={32} />
                <p>Upload financial statements, projections, or other documents</p>
                <span>PDF, Excel, or Word files up to 10MB each</span>
              </div>
            </div>

            <div className="form-group">
              <label>Pitch Deck</label>
              <div className="upload-area">
                <Upload size={32} />
                <p>Upload your pitch deck presentation</p>
                <span>PDF or PowerPoint, Max 20MB</span>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="form-step">
            <h2>Review Your Project</h2>
            <p className="step-description">Make sure everything looks good before submitting</p>

            <div className="review-section">
              <h3>Project Information</h3>
              <div className="review-grid">
                <div className="review-item">
                  <span className="review-label">Project Name</span>
                  <span className="review-value">{formData.name || 'Not provided'}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Industry</span>
                  <span className="review-value">{formData.industry ? getIndustryLabel(formData.industry) : 'Not selected'}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Stage</span>
                  <span className="review-value">{formData.stage || 'Not selected'}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Funding Goal</span>
                  <span className="review-value">${formData.fundingGoal?.toLocaleString() || 0}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Equity Offered</span>
                  <span className="review-value">{formData.equityOffered || 0}%</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Target Market</span>
                  <span className="review-value">{formData.targetMarket || 'Not provided'}</span>
                </div>
              </div>
            </div>

            <div className="review-section">
              <h3>Description</h3>
              <p className="review-description">{formData.description || 'No description provided'}</p>
            </div>

            <div className="review-section">
              <h3>Founding Team</h3>
              <div className="review-founders">
                {formData.founders.map((founder, index) => (
                  <div key={index} className="review-founder">
                    <strong>{founder.name || `Founder ${index + 1}`}</strong>
                    <span>{founder.role || 'Role not specified'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="review-section">
              <h3>Financial Summary</h3>
              <div className="review-grid">
                <div className="review-item">
                  <span className="review-label">Monthly Revenue</span>
                  <span className="review-value">${formData.financials.monthlyRevenue?.toLocaleString() || 0}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Monthly Expenses</span>
                  <span className="review-value">${formData.financials.monthlyExpenses?.toLocaleString() || 0}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Runway</span>
                  <span className="review-value">{formData.financials.runway || 0} months</span>
                </div>
              </div>
            </div>

            <div className="terms-section">
              <label className="terms-checkbox">
                <input type="checkbox" required />
                <span>
                  I confirm that all information provided is accurate and I agree to the 
                  <a href="#"> Terms of Service</a> and <a href="#">Privacy Policy</a>
                </span>
              </label>
            </div>
          </div>
        )}

        <div className="form-actions">
          {step > 1 && (
            <button type="button" className="prev-btn" onClick={prevStep}>
              <ArrowLeft size={18} />
              Previous
            </button>
          )}
          {step < 4 ? (
            <button type="button" className="next-btn" onClick={nextStep}>
              Next
              <ArrowRight size={18} />
            </button>
          ) : (
            <button type="button" className="submit-btn" onClick={handleSubmit}>
              <Save size={18} />
              Submit for Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
