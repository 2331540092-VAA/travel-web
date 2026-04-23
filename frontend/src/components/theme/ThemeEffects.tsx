import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

/**
 * ThemeEffects - Hiệu ứng đặc biệt theo chủ đề
 * - Tết: pháo hoa, hoa mai rơi
 * - Giáng sinh: tuyết rơi
 * - Halloween: dơi bay
 * - Valentine: tim rơi
 */
export default function ThemeEffects() {
  const { theme } = useTheme();
  const [particles, setParticles] = useState<
    Array<{ id: number; left: number; delay: number; duration: number; symbol: string }>
  >([]);

  useEffect(() => {
    if (!theme) {
      setParticles([]);
      return;
    }

    const effectConfig = getEffectConfig(theme.type);
    if (!effectConfig) {
      setParticles([]);
      return;
    }

    const items = Array.from({ length: effectConfig.count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * effectConfig.maxDelay,
      duration: effectConfig.minDuration + Math.random() * effectConfig.durationRange,
      symbol: effectConfig.symbols[Math.floor(Math.random() * effectConfig.symbols.length)],
    }));
    setParticles(items);
  }, [theme]);

  if (!theme || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute text-xl animate-fall"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            top: "-5%",
          }}
        >
          {p.symbol}
        </span>
      ))}

      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}

function getEffectConfig(type: string) {
  switch (type) {
    case "tet":
      return {
        count: 25,
        symbols: ["🌸", "🎋", "🧧", "🎆", "💮"],
        maxDelay: 10,
        minDuration: 6,
        durationRange: 6,
      };
    case "christmas":
      return {
        count: 35,
        symbols: ["❄️", "⛄", "🎄", "🎅", "⭐"],
        maxDelay: 12,
        minDuration: 5,
        durationRange: 8,
      };
    case "halloween":
      return {
        count: 20,
        symbols: ["🎃", "🦇", "👻", "🕸️", "💀"],
        maxDelay: 8,
        minDuration: 5,
        durationRange: 5,
      };
    case "valentine":
      return {
        count: 30,
        symbols: ["❤️", "💕", "💖", "🌹", "💗"],
        maxDelay: 10,
        minDuration: 6,
        durationRange: 6,
      };
    case "mid_autumn":
      return {
        count: 20,
        symbols: ["🏮", "🌕", "🥮", "🐇", "⭐"],
        maxDelay: 10,
        minDuration: 7,
        durationRange: 5,
      };
    default:
      return null;
  }
}
