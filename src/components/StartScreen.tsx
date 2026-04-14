import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils';

interface StartScreenProps {
  tempName: string;
  setTempName: (name: string) => void;
  handleStartGame: () => void;
}

export function StartScreen({ tempName, setTempName, handleStartGame }: StartScreenProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 font-mono overflow-hidden bg-zinc-950">
      {/* 
        USER INSTRUCTION: 
        To use your exact uploaded image, place it in the 'public' folder (e.g., 'navagram-bg.png') 
        and change the backgroundImage URL below to 'url("/navagram-bg.png")'.
      */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2070&q=80")',
          filter: 'blur(8px) brightness(0.5)'
        }}
      />
      
      {/* Game Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Floating Ambient Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute z-0 bg-emerald-400/20 rounded-full blur-md"
          style={{
            width: Math.random() * 150 + 50,
            height: Math.random() * 150 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, 40, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", type: "spring", bounce: 0.4 }}
        className="relative z-10 bg-zinc-950/80 backdrop-blur-xl border-[6px] border-emerald-600/80 p-8 sm:p-12 rounded-[2rem] max-w-2xl w-full text-center space-y-8 shadow-[0_0_80px_rgba(16,185,129,0.3)]"
      >
        {/* Title Section */}
        <div className="space-y-3 relative">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative inline-block"
          >
            <h1 
              className="text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-emerald-200 via-emerald-500 to-emerald-900 drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)] uppercase tracking-tighter" 
              style={{ WebkitTextStroke: '2px rgba(4, 47, 46, 0.8)' }}
            >
              NAVA GRAM
            </h1>
          </motion.div>
          <div className="flex items-center justify-center gap-3 text-emerald-400 font-black tracking-[0.3em] uppercase text-sm sm:text-base drop-shadow-md">
            <Sparkles size={18} className="animate-pulse" /> 
            Misinformation Simulator 
            <Sparkles size={18} className="animate-pulse" />
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-black/50 p-6 rounded-2xl border-2 border-emerald-900/50 shadow-inner relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/0 via-emerald-900/10 to-emerald-900/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <p className="text-emerald-300 text-xs sm:text-sm uppercase font-black tracking-widest mb-3">Enter Agent Designation</p>
          <input 
            type="text" 
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="Mahabali"
            className="w-full bg-zinc-900/90 border-2 border-emerald-700/50 p-4 sm:p-5 rounded-xl text-emerald-100 text-center text-2xl sm:text-3xl font-black focus:border-emerald-400 focus:ring-4 focus:ring-emerald-900/50 outline-none transition-all placeholder:text-emerald-900/50 shadow-inner"
          />
          <p className="text-zinc-400 text-sm mt-4">
            You are Agent <span className="text-white font-bold">{tempName || "Mahabali"}</span>. Your mission is to uncover the truth behind the strange whispers in Navagram.
          </p>
        </div>

        {/* Briefing Section */}
        <div className="text-left bg-zinc-900/70 p-6 rounded-2xl border-2 border-zinc-800/80 shadow-lg">
          <h3 className="text-emerald-400 font-black uppercase text-sm sm:text-base flex items-center gap-2 mb-4 border-b border-zinc-800 pb-3">
            <ShieldAlert size={20} /> Mission Briefing
          </h3>
          <ul className="text-sm text-zinc-300 space-y-4">
            <li className="flex gap-3 items-start">
              <span className="bg-emerald-900/50 text-emerald-400 px-2 py-1 rounded font-black text-xs mt-0.5">DAY 1</span> 
              <span className="leading-relaxed">Talk to villagers at the Chai Nashta Point to collect all 2 rumors. Watch the Brainwashed Meter rise!</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="bg-emerald-900/50 text-emerald-400 px-2 py-1 rounded font-black text-xs mt-0.5">DAY 2</span> 
              <span className="leading-relaxed">Explore the village and verify the rumors at their physical locations. <span className="text-red-400 font-bold">Time is limited!</span></span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="bg-emerald-900/50 text-emerald-400 px-2 py-1 rounded font-black text-xs mt-0.5">DAY 3</span> 
              <span className="leading-relaxed">Catch the villain at the Abandoned Warehouse using the clues you found!</span>
            </li>
          </ul>
        </div>

        {/* Start Button */}
        <button 
          onClick={handleStartGame}
          className="group relative w-full bg-gradient-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white font-black text-2xl sm:text-3xl py-5 sm:py-6 rounded-2xl uppercase tracking-[0.2em] transition-all active:scale-95 shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(16,185,129,0.6)] overflow-hidden border-2 border-emerald-400/50"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-500 ease-in-out" />
          <span className="relative z-10 drop-shadow-md">Start Mission</span>
        </button>
      </motion.div>
    </div>
  );
}
