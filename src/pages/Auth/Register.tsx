import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Phone, TrendingUp, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import investoLogo from '../../assets/investoW.svg';
import './Auth.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    roles: [] as string[],
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      await login(formData.email, formData.password, 'user');
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        setError('Please fill in all required fields');
        return;
      }
      setError('');
    }
    setStep(step + 1);
  };

  const toggleRole = (role: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-branding">
          <div className="brand-logo">
            <img src={investoLogo} alt="Investo" className="logo-icon" style={{ width: '250px', height: '250px' }} />
          </div>
          <h1 className="brand-tagline">Join Our Community</h1>
          <p className="brand-description">
            Create an account and become part of the fastest-growing investment platform 
            connecting entrepreneurs with investors.
          </p>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span style={{ color: 'white' }} className="stat-label">Projects Funded</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">$50M+</span>
              <span style={{ color: 'white' }} className="stat-label">Total Investments</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1,200+</span>
              <span style={{ color: 'white' }} className="stat-label">Active Investors</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">85%</span>
                <span style={{ color: 'white' }} className="stat-label">Success Rate</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-container">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Get started with your investment journey</p>
          </div>

          <div className="step-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className="step-line" />
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {step === 1 && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name*</label>
                    <div className="input-wrapper">
                      <User size={18} className="input-icon" />
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name*</label>
                    <div className="input-wrapper">
                      <User size={18} className="input-icon" />
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address*</label>
                  <div className="input-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <div className="input-wrapper">
                    <Phone size={18} className="input-icon" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button type="button" className="submit-btn" onClick={nextStep}>
                  Continue
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div style={{ margin: 0 }} className="form-group">
                  <label>Choose Your Role* (Select one or both)</label>
                  <div className="role-selector">
                    <button
                      type="button"
                      className={`role-btn ${formData.roles.includes('investor') ? 'active' : ''}`}
                      onClick={() => toggleRole('investor')}
                    >
                      <TrendingUp size={18} />
                      Investor
                    </button>
                    <button
                      type="button"
                      className={`role-btn ${formData.roles.includes('entrepreneur') ? 'active' : ''}`}
                      onClick={() => toggleRole('entrepreneur')}
                    >
                      <Briefcase size={18} />
                      Entrepreneur
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password*</label>
                  <div className="input-wrapper">
                    <Lock size={18} className="input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password*</label>
                  <div className="input-wrapper">
                    <Lock size={18} className="input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <label className="terms-checkbox">
                  <input type="checkbox" required />
                  <span>
                    I agree to the <a href="#">Terms of Service</a> and{' '}
                    <a href="#">Privacy Policy</a>
                  </span>
                </label>

                <div className="form-buttons">
                  <button type="button" className="back-btn" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              </>
            )}
          </form>

          <p className="auth-footer">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
