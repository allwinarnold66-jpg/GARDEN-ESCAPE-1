import { useState } from 'react';

export default function DirectionButtons({ available, onChoose }: { available: string[]; onChoose: (d: string) => void }) {
  const [chosen, setChosen] = useState<string | null>(null);

  function choose(d: string) {
    if (chosen) return;
    setChosen(d);
    onChoose(d);
  }

  return (
    <div className="direction-pad">
      <div className="row">
        {available.includes('FORWARD') && <button disabled={!!chosen} onClick={() => choose('FORWARD')}>⬆ FORWARD</button>}
      </div>
      <div className="row">
        {available.includes('LEFT') && <button disabled={!!chosen} onClick={() => choose('LEFT')}>⬅ LEFT</button>}
        {available.includes('RIGHT') && <button disabled={!!chosen} onClick={() => choose('RIGHT')}>➡ RIGHT</button>}
      </div>
      <div className="row">
        {available.includes('BACKWARD') && <button disabled={!!chosen} onClick={() => choose('BACKWARD')}>⬇ BACKWARD</button>}
      </div>
    </div>
  );
}