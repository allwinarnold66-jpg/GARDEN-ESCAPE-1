import { useState } from 'react';
import { PlayerRole } from '../types';

const ROLES: { role: PlayerRole; color: string; emoji: string }[] = [
  { role: 'HR', color: '#22c55e', emoji: '🟢' },
  { role: 'MARKETING', color: '#3b82f6', emoji: '🔵' },
  { role: 'FINANCE', color: '#eab308', emoji: '🟡' },
  { role: 'OPERATIONS', color: '#ef4444', emoji: '🔴' }
];

export default function JoinForm({ gs, onBack }: { gs: any; onBack: () => void }) {
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'code' | 'role'>('code');
  const [taken, setTaken] = useState<Record<string, boolean>>({});
  const [error, setError] = useState('');

  function handleCheck() {
    if (!code.trim()) return;
    gs.checkRoom(code.trim().toUpperCase(), (res: any) => {
      if (!res.exists) { setError('Room not found'); return; }
      setTaken(res.taken);
      setError('');
      setStep('role');
    });
  }

  function handleSelect(role: PlayerRole) {
    if (taken[role]) return;
    gs.joinRoom(code.trim().toUpperCase(), role);
  }

  return (
    <div className="center card">
      <h1>🌿 GARDEN ESCAPE — JOIN GAME</h1>
      {step === 'code' && (
        <>
          <input placeholder="Enter Room Code (e.g. GE4827)" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} />
          <button className="primary" onClick={handleCheck}>Continue</button>
          {error && <p className="error">{error}</p>}
        </>
      )}
      {step === 'role' && (
        <>
          <h3>SELECT PLAYER</h3>
          <div className="role-grid">
            {ROLES.map((r) => (
              <button key={r.role} disabled={taken[r.role]} style={{ borderColor: r.color }} onClick={() => handleSelect(r.role)}>
                {r.emoji} {r.role} {taken[r.role] && ' — ✓ ALREADY JOINED'}
              </button>
            ))}
          </div>
          {gs.joinError && <p className="error">{gs.joinError}</p>}
        </>
      )}
      <button className="link" onClick={onBack}>Back</button>
    </div>
  );
}