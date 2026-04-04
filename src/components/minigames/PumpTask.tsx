import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function PumpTask({ onComplete, onClose }: { onComplete: () => void, onClose: () => void }) {
  const [valves, setValves] = useState<{ id: number, value: number, active: boolean }[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const newValves = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      value: i + 1,
      active: true
    })).sort(() => Math.random() - 0.5);
    setValves(newValves);
  }, []);

  const handleValveClick = (value: number) => {
    if (value === currentStep) {
      setValves(prev => prev.map(v => v.value === value ? { ...v, active: false } : v));
      if (currentStep === 5) {
        setTimeout(onComplete, 500);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    } else {
      // Reset if wrong
      setCurrentStep(1);
      setValves(prev => prev.map(v => ({ ...v, active: true })));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-zinc-900 border-4 border-zinc-700 rounded-xl p-6 max-w-md w-full relative text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-2">Restart the Pump</h2>
        <p className="text-zinc-400 text-sm mb-6">Press the pressure valves in ascending order (1 to 5).</p>
        
        <div className="grid grid-cols-3 gap-4 place-items-center mb-4">
          {valves.map(valve => (
            <button
              key={valve.id}
              onClick={() => handleValveClick(valve.value)}
              disabled={!valve.active}
              className={`w-16 h-16 rounded-full font-black text-2xl transition-all ${valve.active ? 'bg-blue-500 hover:bg-blue-400 text-white shadow-[0_4px_0_rgb(29,78,216)] active:translate-y-1 active:shadow-none' : 'bg-zinc-700 text-zinc-500 cursor-not-allowed'}`}
            >
              {valve.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
