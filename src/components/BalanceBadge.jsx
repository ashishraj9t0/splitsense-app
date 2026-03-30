import React from 'react';

function BalanceBadge({ amount }) {
  const isPositive = amount > 0;
  const isNegative = amount < 0;

  const bgColor = isPositive ? '#f0fdf4' : isNegative ? '#fef2f2' : '#f9fafb';
  const textColor = isPositive ? '#15803d' : isNegative ? '#b91c1c' : '#374151';
  const borderColor = isPositive ? '#bbf7d0' : isNegative ? '#fecaca' : '#e5e7eb';
  const text = isPositive ? `You get ₹${amount}` : isNegative ? `You owe ₹${Math.abs(amount)}` : 'Settled up';

  return (
    <span style={{
      padding: '4px 8px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: '500',
      backgroundColor: bgColor,
      color: textColor,
      border: `1px solid ${borderColor}`
    }}>
      {text}
    </span>
  );
}

export default BalanceBadge;
