/**
 * Opens the native UPI app (PhonePe / GPay / Paytm)
 * with amount and payee pre-filled.
 * Falls back to QR code on desktop (no upi:// handler).
 */
import { useState } from 'react';
import UpiQr from './UpiQr';

export default function UpiButton({ upiLink, payeeName, amount }) {
  const [showQr, setShowQr] = useState(false);
  const isMobile = /Android|iPhone/i.test(navigator.userAgent);

  function handleClick() {
    if (isMobile) {
      window.location.href = upiLink; // opens UPI app chooser
    } else {
      setShowQr(true); // show QR to scan with phone
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="w-full py-3 rounded-xl bg-teal-50 text-teal-800
                   border border-teal-200 font-medium text-sm
                   active:scale-95 transition-transform"
      >
        Pay ₹{amount} via UPI
      </button>
      {showQr && (
        <UpiQr upiLink={upiLink} onClose={() => setShowQr(false)} />
      )}
    </>
  );
}

// UpiQr.jsx — renders QR for desktop users
import QRCode from 'react-qr-code';

export default function UpiQr({ upiLink, onClose }) {
  return (
    <div className="mt-4 flex flex-col items-center gap-3">
      <p className="text-xs text-gray-500">
        Scan with your phone to pay via UPI
      </p>
      <QRCode value={upiLink} size={180} />
      <button onClick={onClose} className="text-xs text-gray-400">
        close
      </button>
    </div>
  );
}