import React from 'react';

interface AlertWeaveLogoProps {
  className?: string;
  glow?: boolean;
}

export const AlertWeaveLogo: React.FC<AlertWeaveLogoProps> = ({ className = "w-5 h-5", glow = true }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      referrerPolicy="no-referrer"
    >
      <defs>
        {/* Sleek metallic/neon cyber cyan and blue gradients */}
        <linearGradient id="cyber-grad-primary" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0062FF" />
          <stop offset="60%" stopColor="#00D2FF" />
          <stop offset="100%" stopColor="#00E5FF" />
        </linearGradient>
        
        <linearGradient id="cyber-grad-secondary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#0044CC" />
        </linearGradient>

        {/* Glow effect filter for cyberpunk neon realism */}
        {glow && (
          <filter id="cyber-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      <g filter={glow ? "url(#cyber-glow)" : undefined}>
        {/* Inner stylized chevron representing the core attack correlation path */}
        <path
          d="M 50 38 L 63 64 C 65 68, 62 72, 58 72 L 42 72 C 38 72, 35 68, 37 64 L 50 38 Z"
          stroke="url(#cyber-grad-secondary)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />

        {/* Horizontal digital link tracks of the inner structure */}
        <path
          d="M 43 55 L 57 55"
          stroke="url(#cyber-grad-primary)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M 40 63 L 60 63"
          stroke="url(#cyber-grad-primary)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Outer futuristic shell (main geometric 'A' frame) with digital telemetry gaps */}
        <path
          d="M 41 27 L 50 16 L 68 48 C 72 55, 75 62, 79 69 C 81 73, 78 78, 73 78 L 68 78"
          stroke="url(#cyber-grad-primary)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M 32 44 L 21 64 C 18 70, 20 78, 27 78 L 38 78"
          stroke="url(#cyber-grad-primary)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default AlertWeaveLogo;
