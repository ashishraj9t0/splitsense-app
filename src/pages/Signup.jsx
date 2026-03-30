import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/auth/register', {
        username: username.trim(),
        email: email.trim(),
        password,
      });

      navigate('/', {
        replace: true,
        state: {
          signupSuccess: 'Signup complete. Please login with your new account.',
        },
      });
    } catch (err) {
      const status = err.response?.status;
      const message =
        err.response?.data?.message ||
        err.message ||
        (status === 403
          ? 'Signup was forbidden by the server. The backend may require a different auth route or security configuration.'
          : 'Unable to complete signup. Please try again.');
      setError(message);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <button
            type="button"
            className="auth-icon-button"
            onClick={() => navigate('/', { replace: true })}
            aria-label="Back to login"
            title="Back to login"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M14.5 5.5 8 12l6.5 6.5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
          <div>
            <p className="auth-kicker">Create account</p>
            <h1 className="auth-title">Join SplitSense</h1>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Username</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              type="text"
              placeholder="Enter username"
              required
            />
          </label>

          <label className="auth-field">
            <span>Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Enter email"
              required
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Create password"
              required
            />
          </label>

          {error ? <div className="auth-message auth-message-error">{error}</div> : null}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
