import React from 'react';

function MemberAvatar({ member, size = 'md' }) {
  const sizeStyles = {
    sm: { width: '32px', height: '32px', fontSize: '12px' },
    md: { width: '40px', height: '40px', fontSize: '14px' },
    lg: { width: '48px', height: '48px', fontSize: '16px' }
  };

  return (
    <div style={{
      backgroundColor: '#3b82f6',
      color: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      ...sizeStyles[size]
    }}>
      {member.avatar}
    </div>
  );
}

export default MemberAvatar;
