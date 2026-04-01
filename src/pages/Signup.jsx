import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';

const SEND_SIGNUP_OTP_PATH = '/auth/send-otp';
const COMPLETE_SIGNUP_PATH = '/auth/register';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const signupPayload = {
        username: username.trim(),
        email: email.trim(),
        password,
      };

      if (!otpSent) {
        const { data } = await api.post(SEND_SIGNUP_OTP_PATH, {
          email: signupPayload.email,
        });

        if (data !== true) {
          throw new Error('Unable to send OTP. Please check your email address.');
        }

        setOtpSent(true);
        setSuccessMessage('A 6-digit OTP has been sent to your email. Enter it below to finish signup.');
        return;
      }

      const normalizedOtp = otp.replace(/\D/g, '');
      if (normalizedOtp.length !== 6) {
        throw new Error('Please enter the 6-digit OTP sent to your email.');
      }

      const { data } = await api.post(COMPLETE_SIGNUP_PATH, {
        ...signupPayload,
        otp: normalizedOtp,
      });

      if (data !== true && !(data && typeof data === 'object')) {
        throw new Error('Unable to verify OTP and create your account. Please try again.');
      }

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
          : otpSent
            ? 'Unable to verify OTP and create your account. Please try again.'
            : 'Unable to send OTP. Please try again.');
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function handleOtpChange(event) {
    const digitsOnly = event.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(digitsOnly);
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
              disabled={loading || otpSent}
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
              disabled={loading || otpSent}
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
              disabled={loading || otpSent}
            />
          </label>

          {otpSent ? (
            <label className="auth-field">
              <span>Email OTP</span>
              <input
                value={otp}
                onChange={handleOtpChange}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="\d{6}"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                required
                disabled={loading}
              />
            </label>
          ) : null}

          {successMessage ? (
            <div className="auth-message auth-message-success">{successMessage}</div>
          ) : null}
          {error ? <div className="auth-message auth-message-error">{error}</div> : null}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading
              ? otpSent
                ? 'Verifying OTP...'
                : 'Sending OTP...'
              : otpSent
                ? 'Verify OTP & Create Account'
                : 'Send OTP'}
          </button>

          {otpSent ? (
            <button
              type="button"
              className="auth-link-button"
              disabled={loading}
              onClick={() => {
                setOtpSent(false);
                setOtp('');
                setSuccessMessage('');
                setError('');
              }}
            >
              Edit signup details
            </button>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default Signup;
