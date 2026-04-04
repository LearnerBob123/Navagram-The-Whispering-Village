import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { MapPin, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Keyboard, MessageCircleMore, Smartphone } from 'lucide-react';
import { cn } from '../lib/utils';
import { Position } from '../types';
import { Agent } from '../models/Agent';
import { LOCATIONS } from '../data/locations';
import { RUMORS } from '../data/rumors';
import { MAP_SIZE, TILE_MAP } from '../data/map';
import { SimulationEngine } from '../models/Simulation';

const TILE_SIZE = 56;
const WORLD_SIZE = MAP_SIZE * TILE_SIZE;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface GameMapProps {
  playerPos: Position;
  agents: Agent[];
  verifiedRumors: Record<string, boolean>;
  engine: SimulationEngine;
  day: number;
  isSearchableLocation: (locId: string) => boolean;
  verifyAtLocation: (locId: string) => void;
  handleAgentClick: (agent: Agent) => void;
  playerName: string;
}

// Pre-compute tile classes once — never re-render the tile grid
const TILE_CLASSES: string[] = [];
for (let y = 0; y < MAP_SIZE; y++) {
  for (let x = 0; x < MAP_SIZE; x++) {
    const tile = TILE_MAP[y][x];
    let bgClass = "bg-[#7cb342] border border-[#689f38]/20";
    if (tile === 1) bgClass = "bg-[#d7ccc8] border border-[#bcaaa4]/40";
    if (tile === 2) bgClass = "bg-[#78909c] border-t-4 border-[#546e7a] shadow-sm z-10";
    if (tile === 3) bgClass = "bg-[#8d6e63] border-b-2 border-[#5d4037]";
    if (tile === 4) bgClass = "bg-[#b0bec5] border border-[#90a4ae]";
    TILE_CLASSES.push(bgClass);
  }
}

// Memoized tile grid — rendered once, never re-rendered
const TileGrid = React.memo(function TileGrid() {
  return (
    <div
      className="grid absolute inset-0"
      style={{
        width: WORLD_SIZE,
        height: WORLD_SIZE,
        gridTemplateColumns: `repeat(${MAP_SIZE}, ${TILE_SIZE}px)`,
        gridTemplateRows: `repeat(${MAP_SIZE}, ${TILE_SIZE}px)`,
      }}
    >
      {Array.from({ length: MAP_SIZE * MAP_SIZE }).map((_, i) => {
        const tile = TILE_MAP[Math.floor(i / MAP_SIZE)][i % MAP_SIZE];
        return (
          <div key={i} className={cn("relative", TILE_CLASSES[i])}>
            {tile === 5 && (
              <div className="absolute inset-[-30%] bg-[#43a047] rounded-full shadow-md border-2 border-[#2e7d32] z-0" />
            )}
          </div>
        );
      })}
    </div>
  );
});

export function GameMap({
  playerPos,
  agents,
  verifiedRumors,
  engine,
  day,
  isSearchableLocation,
  verifyAtLocation,
  handleAgentClick,
  playerName
}: GameMapProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef({ x: 0, y: 0 });
  const playerPixelRef = useRef({ x: (playerPos.x + 0.5) * TILE_SIZE, y: (playerPos.y + 0.5) * TILE_SIZE });
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  // Track viewport size
  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;

    const updateSize = () => {
      setViewportSize({ width: element.clientWidth, height: element.clientHeight });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Single rAF loop for both camera + player sprite interpolation
  useEffect(() => {
    if (!viewportSize.width || !viewportSize.height) return;

    let frameId = 0;
    let running = true;

    const animate = () => {
      if (!running) return;

      // Target player pixel position (grid-snapped)
      const targetPx = (playerPos.x + 0.5) * TILE_SIZE;
      const targetPy = (playerPos.y + 0.5) * TILE_SIZE;

      // Smoothly interpolate the player sprite position
      const pp = playerPixelRef.current;
      pp.x = lerp(pp.x, targetPx, 0.25);
      pp.y = lerp(pp.y, targetPy, 0.25);

      // Snap when close enough
      if (Math.abs(targetPx - pp.x) < 0.5) pp.x = targetPx;
      if (Math.abs(targetPy - pp.y) < 0.5) pp.y = targetPy;

      // Update player sprite directly (no React re-render)
      if (playerRef.current) {
        playerRef.current.style.transform = `translate3d(${pp.x}px, ${pp.y}px, 0) translate(-50%, -50%)`;
      }

      // Camera target: center on the interpolated player pixel
      const targetCamX = clamp(viewportSize.width / 2 - pp.x, viewportSize.width - WORLD_SIZE, 0);
      const targetCamY = clamp(viewportSize.height / 2 - pp.y, viewportSize.height - WORLD_SIZE, 0);

      // Smoothly interpolate camera
      const cam = cameraRef.current;
      cam.x = lerp(cam.x, targetCamX, 0.12);
      cam.y = lerp(cam.y, targetCamY, 0.12);

      // Snap when close
      if (Math.abs(targetCamX - cam.x) < 0.3) cam.x = targetCamX;
      if (Math.abs(targetCamY - cam.y) < 0.3) cam.y = targetCamY;

      // Update world transform directly (no React re-render)
      if (worldRef.current) {
        worldRef.current.style.transform = `translate3d(${cam.x}px, ${cam.y}px, 0)`;
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
    };
  }, [playerPos.x, playerPos.y, viewportSize.width, viewportSize.height]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] border-4 border-zinc-800 bg-[#8ecf5c] shadow-2xl shadow-emerald-950/40" ref={viewportRef}>
      <div
        ref={worldRef}
        className="absolute left-0 top-0 will-change-transform"
        style={{
          width: WORLD_SIZE,
          height: WORLD_SIZE,
        }}
      >
        <TileGrid />

        {LOCATIONS.map(loc => {
          const isPlayerInside = playerPos.x >= loc.x && playerPos.x < loc.x + loc.w && 
                               playerPos.y >= loc.y && playerPos.y < loc.y + loc.h;
          const isSearchable = isSearchableLocation(loc.id);

          return (
            <div
              key={loc.id}
              onClick={() => verifyAtLocation(loc.id)}
              className={cn(
                "absolute border-2 overflow-hidden transition-all duration-300 cursor-pointer",
                loc.color, 
                loc.border,
                isPlayerInside && "ring-4 ring-white/50 z-30"
              )}
              style={{
                left: loc.x * TILE_SIZE,
                top: loc.y * TILE_SIZE,
                width: loc.w * TILE_SIZE,
                height: loc.h * TILE_SIZE,
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-1">
                <span className="text-2xl opacity-30 drop-shadow-md">{loc.emoji}</span>
                <span className="text-black/70 text-[10px] font-black pointer-events-none drop-shadow-md uppercase bg-white/60 px-2 py-0.5 rounded shadow-sm z-10">
                  {loc.name}
                </span>
                
                {day === 2 && isSearchable && isPlayerInside && (
                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-2 bg-emerald-600 text-white text-[10px] font-black px-3 py-1.5 rounded-lg border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 shadow-lg z-40 uppercase"
                  >
                    Search Location
                  </motion.button>
                )}
                {day === 3 && loc.id === 'warehouse' && isPlayerInside && (
                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-2 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-lg border-b-4 border-red-800 active:border-b-0 active:translate-y-1 shadow-lg z-40 uppercase animate-pulse"
                  >
                    Unlock Door
                  </motion.button>
                )}
              </div>
            </div>
          );
        })}

        {day === 2 && LOCATIONS.map(loc => {
          if (!isSearchableLocation(loc.id)) return null;
          
          return (
            <div
              key={`pin-${loc.id}`}
              className="absolute flex h-10 w-10 items-center justify-center z-20 group"
              style={{ left: loc.x * TILE_SIZE + (loc.w * TILE_SIZE)/2 - 20, top: loc.y * TILE_SIZE + (loc.h * TILE_SIZE)/2 - 28 }}
            >
              <MapPin className="text-red-600 animate-bounce drop-shadow-md" size={22} />
              <div className="absolute -top-6 bg-white text-black text-[8px] px-1.5 py-0.5 rounded border-2 border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30 font-bold shadow-sm">
                Search: {loc.name}
              </div>
            </div>
          );
        })}

        {agents.map(agent => (
          <motion.div
            key={agent.id}
            animate={{ left: agent.pos.x * TILE_SIZE + TILE_SIZE / 2, top: agent.pos.y * TILE_SIZE + TILE_SIZE / 2 }}
            className={cn("absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center z-10 group", !agent.isBackground && "cursor-pointer")}
            transition={{ type: "tween", duration: 0.8, ease: "linear" }}
            onClick={() => handleAgentClick(agent)}
          >
            {!agent.isBackground && (
              <div className="absolute -top-8 bg-white border-2 border-gray-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md whitespace-nowrap z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {agent.role === 'oracle' ? 'AI: ✨' : `${agent.name.substring(0,2)}: 💬`}
              </div>
            )}
            <div className={cn("relative h-10 w-10 transition-transform drop-shadow-lg", !agent.isBackground && "hover:scale-110")}>
              <div className={cn(
                "absolute left-2.5 top-0 h-5 w-5 rounded-full border-[2px] border-black z-10 shadow-sm",
                agent.role === 'oracle' ? 'bg-[#fde68a]' : 'bg-[#fcd5b4]'
              )}>
                <div className="absolute left-1 top-1.5 h-1 w-1 bg-black rounded-full opacity-70"></div>
                <div className="absolute right-1 top-1.5 h-1 w-1 bg-black rounded-full opacity-70"></div>
              </div>
              <div
                className={cn(
                  "absolute bottom-0 left-1 h-6 w-8 rounded-t-xl border-[2px] border-black shadow-inner",
                  agent.role === 'oracle' && 'shadow-[0_0_12px_rgba(20,184,166,0.8)]'
                )}
                style={{ backgroundColor: agent.color }}
              >
                <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-1 bg-black/10"></div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Player sprite — positioned via ref, NOT React state */}
        <div
          ref={playerRef}
          className="absolute flex h-16 w-16 flex-col items-center justify-center z-20 will-change-transform"
          style={{
            left: 0,
            top: 0,
            transform: `translate3d(${(playerPos.x + 0.5) * TILE_SIZE}px, ${(playerPos.y + 0.5) * TILE_SIZE}px, 0) translate(-50%, -50%)`,
          }}
        >
          <div className="absolute -top-8 bg-emerald-100 border-2 border-emerald-500 text-emerald-900 text-[10px] font-black px-2 py-0.5 rounded-md shadow-md whitespace-nowrap z-20">
            AGENT {playerName.toUpperCase()}
          </div>
          <div className="relative h-12 w-12 drop-shadow-xl">
            <div className="absolute left-3 top-0 h-6 w-6 rounded-full bg-[#fcd5b4] border-[2px] border-emerald-800 z-10 shadow-sm">
              <div className="absolute -left-0.5 -top-1.5 h-3 w-6 bg-emerald-600 rounded-t-full border-b border-emerald-800"></div>
              <div className="absolute left-1 top-2 h-1.5 w-1.5 bg-emerald-900 rounded-full"></div>
              <div className="absolute right-1 top-2 h-1.5 w-1.5 bg-emerald-900 rounded-full"></div>
            </div>
            <div className="absolute bottom-0 left-1.5 h-7 w-9 rounded-t-xl border-[2px] border-emerald-800 bg-emerald-500 shadow-inner overflow-hidden">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-1.5 bg-emerald-300"></div>
              <div className="absolute left-1 top-1 h-2 w-2 bg-yellow-400 rounded-sm border border-emerald-800"></div>
            </div>
          </div>
        </div>

      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(9,9,11,0.18)_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />

      <div className="absolute bottom-4 left-4 z-30 flex flex-wrap gap-2">
        <div className="bg-[#f8f9fa]/95 px-3 py-2 rounded-xl border-2 border-[#cbd5e1] flex items-center gap-3 shadow-xl backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-1">
            <div /> <div className="p-1 bg-white border border-gray-300 rounded shadow-sm text-gray-600"><ArrowUp size={12} /></div> <div />
            <div className="p-1 bg-white border border-gray-300 rounded shadow-sm text-gray-600"><ArrowLeft size={12} /></div>
            <div className="p-1 bg-white border border-gray-300 rounded shadow-sm text-gray-600"><ArrowDown size={12} /></div>
            <div className="p-1 bg-white border border-gray-300 rounded shadow-sm text-gray-600"><ArrowRight size={12} /></div>
          </div>
          <span className="text-[10px] font-bold text-gray-500 uppercase">Move</span>
        </div>
        <div className="bg-[#f8f9fa]/95 px-3 py-2 rounded-xl border-2 border-[#cbd5e1] flex items-center gap-2 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-gray-700">
            <Keyboard size={12} />
            <span className="text-[10px] font-black">E</span>
          </div>
          <MessageCircleMore size={14} className="text-emerald-600" />
          <span className="text-[10px] font-bold text-gray-500 uppercase">Interact</span>
        </div>
        <div className="bg-[#f8f9fa]/95 px-3 py-2 rounded-xl border-2 border-[#cbd5e1] flex items-center gap-2 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-gray-700">
            <Keyboard size={12} />
            <span className="text-[10px] font-black">P</span>
          </div>
          <Smartphone size={14} className="text-sky-600" />
          <span className="text-[10px] font-bold text-gray-500 uppercase">Phone</span>
        </div>
      </div>
    </div>
  );
}
