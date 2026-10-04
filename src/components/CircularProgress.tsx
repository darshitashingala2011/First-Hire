import React from 'react';

interface CircularProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  score,
  size = 120,
  strokeWidth = 10,
  label,
  sublabel
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 80) return 'text-emerald-500 stroke-emerald-500';
    if (s >= 65) return 'text-indigo-500 stroke-indigo-500';
    if (s >= 50) return 'text-amber-500 stroke-amber-500';
    return 'text-rose-500 stroke-rose-500';
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="stroke-slate-200 dark:stroke-slate-800 fill-none"
            strokeWidth={strokeWidth}
          />
          {/* Progress Stroke */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={`fill-none transition-all duration-1000 ease-out ${getColor(score)}`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
            {Math.round(score)}
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            / 100
          </span>
        </div>
      </div>

      {label && (
        <span className="mt-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
          {label}
        </span>
      )}
      {sublabel && (
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          {sublabel}
        </span>
      )}
    </div>
  );
};
