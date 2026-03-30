import { useState } from 'react';
import UpiButton from './UpiButton';
import { api } from '../api/client';

export default function SettlementCard({ settlement, currentUserId }) {
  const [status, setStatus] = useState(settlement.status);
  const [loading, setLoading] = useState(false);
  const isMyPayment = settlement.fromUserId === currentUserId;

  // called both by "Mark paid" button AND by WebSocket push
  function markPaid() {
    setStatus('PAID'); // optimistic update
  }

  async function handleMarkPaid() {
    setLoading(true);
    try {
      await api.patch(`/settlements/${settlement.id}/mark-paid`);
      markPaid(); // WS will also push to other members
    } catch (e) {
      if (e.response?.status === 409) {
        // optimistic lock conflict — someone else marked it
        markPaid();
      }
    } finally { setLoading(false); }
  }

  if (status === 'PAID') return (
    <div className="p-4 rounded-xl border border-teal-100 bg-teal-50
                    text-teal-700 text-sm text-center">
      ✓ {settlement.fromUser} paid ₹{settlement.amount}
    </div>
  );

  return (
    <div className="p-4 rounded-xl border border-gray-100 bg-white">
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-sm">{settlement.fromUser}</span>
        <span className="text-gray-400 text-xs px-2">→</span>
        <span className="font-medium text-sm">{settlement.toUser}</span>
        <span className="ml-auto font-semibold text-base">
          ₹{settlement.amount}
        </span>
      </div>

      {isMyPayment && settlement.upiLink && (
        <UpiButton
          upiLink={settlement.upiLink}
          payeeName={settlement.toUser}
          amount={settlement.amount}
        />
      )}
      {isMyPayment && (
        <button onClick={handleMarkPaid} disabled={loading}
          className="mt-2 w-full py-2 text-xs text-gray-500
                     border border-gray-200 rounded-lg">
          {loading ? 'Saving...' : 'I paid outside the app'}
        </button>
      )}
    </div>
  );
}