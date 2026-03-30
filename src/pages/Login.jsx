import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { clearAuthToken, isAuthenticated, setAuthToken } from '../auth';

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard', { replace: true });
      return;
    }

    if (location.state?.signupSuccess) {
      setSuccessMessage(location.state.signupSuccess);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.pathname, location.state, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    clearAuthToken();
    setLoading(true);

    try {
      const trimmedIdentifier = identifier.trim();
      const loginPayload = trimmedIdentifier.includes('@')
        ? { email: trimmedIdentifier, password }
        : { username: trimmedIdentifier, password };

      const { data } = await api.post('/auth/login', {
        ...loginPayload,
      });

      if (!data.token) {
        throw new Error('Login succeeded but no JWT token was returned by the backend.');
      }

      setAuthToken(data.token);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const status = err.response?.status;
      const message =
        err.response?.data?.message ||
        err.message ||
        (status === 403
          ? 'Login was forbidden by the server. Please check the API path and backend security settings.'
          : 'Unable to login. Please try again.');
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div>
            <p className="auth-kicker">Welcome back</p>
            <h1 className="auth-title">SplitSense Login</h1>
          </div>
          <button
            type="button"
            className="auth-icon-button"
            onClick={() => navigate('/signup', { replace: true })}
            aria-label="Go to signup"
            title="Go to signup"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 5v14M5 12h14"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-field">
            <span>Email or Username</span>
            <input
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              type="text"
              placeholder="Enter email or username"
              required
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Enter password"
              required
            />
          </label>
 
          {successMessage ? (
            <div className="auth-message auth-message-success">{successMessage}</div>
          ) : null}
          {error ? <div className="auth-message auth-message-error">{error}</div> : null}

          <button type="submit" disabled={loading} className="auth-submit">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
