import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGroup from '../hooks/useGroup';
import MemberAvatar from '../components/MemberAvatar';
import BalanceBadge from '../components/BalanceBadge';
import { clearAuthToken, isAuthenticated } from '../auth';

function Dashboard() {
  const { groups, totalOwed, totalOwedToYou, loading } = useGroup();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  async function handleLogout() {
    clearAuthToken();
    navigate('/', { replace: true });
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '18px' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '896px', margin: '0 auto', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Dashboard</h1>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                backgroundColor: '#111827',
                color: 'white',
                padding: '10px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Logout
            </button>
          </div>

          {/* Balance Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '14px', color: '#dc2626', fontWeight: '500' }}>You owe</div>
              <div style={{ fontSize: '30px', fontWeight: 'bold', color: '#b91c1c' }}>₹{totalOwed}</div>
            </div>
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '14px', color: '#16a34a', fontWeight: '500' }}>You're owed</div>
              <div style={{ fontSize: '30px', fontWeight: 'bold', color: '#15803d' }}>₹{totalOwedToYou}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Groups List */}
      <div style={{ maxWidth: '896px', margin: '0 auto', padding: '24px 16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>Your Groups</h2>

        {groups.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>No groups yet</p>
            <button style={{ backgroundColor: '#3b82f6', color: 'white', padding: '8px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
              Create your first group
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {groups.map((group) => (
              <Link
                key={group.id}
                to={`/group/${group.id}`}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e7eb',
                  padding: '16px',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  transition: 'box-shadow 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'}
                onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>{group.name}</h3>
                  <BalanceBadge amount={group.totalBalance} />
                </div>

                {/* Member Avatars */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', marginLeft: '-8px' }}>
                    {group.members.slice(0, 4).map((member) => (
                      <div key={member.id} style={{ marginLeft: '8px' }}>
                        <MemberAvatar member={member} size="sm" />
                      </div>
                    ))}
                    {group.members.length > 4 && (
                      <div style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#d1d5db',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#374151',
                        marginLeft: '8px'
                      }}>
                        +{group.members.length - 4}
                      </div>
                    )}
                  </div>

                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    {group.members.length} members
                  </div>
                </div>

                {/* Quick Balance Summary */}
                <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {group.members.slice(0, 3).map((member) => (
                    <BalanceBadge key={member.id} amount={member.balance} />
                  ))}
                  {group.members.length > 3 && (
                    <span style={{ fontSize: '12px', color: '#6b7280', padding: '4px 8px' }}>
                      +{group.members.length - 3} more
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <Link
        to="/add-expense"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#3b82f6',
          color: 'white',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textDecoration: 'none',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
      >
        <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </Link>
    </div>
  );
}

export default Dashboard;
