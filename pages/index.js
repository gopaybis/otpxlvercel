import { useState } from 'react';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);

  async function sendOtp() {
    if (!phone.startsWith('62')) {
      setMessage('Nomor harus diawali dengan 62');
      return;
    }
    setMessage('Mengirim OTP...');
    try {
      const res = await fetch('/api/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send', contact: phone })
      });
      const text = await res.text();
      setMessage('OTP telah dikirim. Silahkan cek SMS Anda.');
      setStep(2);
    } catch (e) {
      setMessage('Gagal mengirim OTP: ' + e.message);
    }
  }

  async function verifyOtp() {
    setMessage('Verifikasi OTP...');
    try {
      const res = await fetch('/api/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', contact: phone, otp })
      });
      const text = await res.text();
      setMessage('Respon server: ' + text);
    } catch (e) {
      setMessage('Gagal verifikasi OTP: ' + e.message);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>XL OTP Demo</h2>
      {step === 1 && (
        <>
          <label>Nomor XL (awali dengan 62):</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: '100%', padding: 8, marginBottom: 12 }}
          />
          <button onClick={sendOtp} style={{ padding: '8px 16px' }}>
            Kirim OTP
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <label>Masukkan OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ width: '100%', padding: 8, marginBottom: 12 }}
          />
          <button onClick={verifyOtp} style={{ padding: '8px 16px' }}>
            Verifikasi OTP
          </button>
        </>
      )}
      <p style={{ marginTop: 20 }}>{message}</p>
    </div>
  );
}