import React from 'react';

interface LogoIconProps {
  size?: number;
  className?: string;
}

/**
 * MiaoFi Icon — A geometric lucky-cat silhouette.
 * Two pointed ears, a subtle coin/circle motif on the forehead (nod to 招财猫),
 * and a raised-paw negative-space detail. Designed to read at 16px.
 */
export const MiaoFiIcon: React.FC<LogoIconProps> = ({ size = 64, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="MiaoFi icon"
  >
    {/* Background rounded square */}
    <rect width="512" height="512" rx="112" fill="url(#iconGrad)" />

    {/* Cat head silhouette — geometric, slightly rounded */}
    {/* Left ear */}
    <path
      d="M148 210 L176 112 C180 100 192 96 200 104 L216 140"
      stroke="white"
      strokeWidth="0"
      fill="white"
      opacity="0.95"
    />
    <polygon points="148,210 184,108 220,148" fill="white" opacity="0.95" />

    {/* Right ear */}
    <polygon points="364,210 328,108 292,148" fill="white" opacity="0.95" />

    {/* Head — rounded rectangle / ellipse */}
    <ellipse cx="256" cy="260" rx="120" ry="110" fill="white" opacity="0.95" />

    {/* Left eye — stylized slit (smart/clever look) */}
    <ellipse cx="216" cy="248" rx="16" ry="22" fill="url(#iconGrad)" />
    <ellipse cx="220" cy="244" rx="5" ry="8" fill="white" opacity="0.7" />

    {/* Right eye */}
    <ellipse cx="296" cy="248" rx="16" ry="22" fill="url(#iconGrad)" />
    <ellipse cx="300" cy="244" rx="5" ry="8" fill="white" opacity="0.7" />

    {/* Nose — small triangle */}
    <path d="M256 272 L250 282 L262 282 Z" fill="url(#iconGrad)" opacity="0.6" />

    {/* Mouth — subtle smile */}
    <path
      d="M244 286 Q256 296 268 286"
      stroke="url(#iconGrad)"
      strokeWidth="3"
      fill="none"
      opacity="0.4"
      strokeLinecap="round"
    />

    {/* Coin / gem on forehead — the "妙" / fortune symbol */}
    <circle cx="256" cy="208" r="18" fill="url(#coinGrad)" />
    <text
      x="256"
      y="215"
      textAnchor="middle"
      fontSize="18"
      fontWeight="800"
      fill="white"
      fontFamily="sans-serif"
    >
      ₿
    </text>

    {/* Raised paw — bottom right, the lucky cat gesture */}
    <path
      d="M330 330 Q350 310 358 340 Q362 360 340 370 Q320 374 316 354 Z"
      fill="white"
      opacity="0.9"
    />
    {/* Paw pads */}
    <circle cx="336" cy="348" r="5" fill="url(#iconGrad)" opacity="0.3" />
    <circle cx="344" cy="340" r="3.5" fill="url(#iconGrad)" opacity="0.3" />
    <circle cx="328" cy="356" r="3.5" fill="url(#iconGrad)" opacity="0.3" />

    {/* Whiskers — left */}
    <line x1="190" y1="268" x2="140" y2="258" stroke="url(#iconGrad)" strokeWidth="2.5" opacity="0.25" strokeLinecap="round" />
    <line x1="190" y1="278" x2="138" y2="282" stroke="url(#iconGrad)" strokeWidth="2.5" opacity="0.25" strokeLinecap="round" />

    {/* Whiskers — right */}
    <line x1="322" y1="268" x2="372" y2="258" stroke="url(#iconGrad)" strokeWidth="2.5" opacity="0.25" strokeLinecap="round" />
    <line x1="322" y1="278" x2="374" y2="282" stroke="url(#iconGrad)" strokeWidth="2.5" opacity="0.25" strokeLinecap="round" />

    <defs>
      <linearGradient id="iconGrad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="50%" stopColor="#6C5CE7" />
        <stop offset="100%" stopColor="#4F46E5" />
      </linearGradient>
      <linearGradient id="coinGrad" x1="238" y1="190" x2="274" y2="226" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Flat/transparent icon variant (no background square)
 */
export const MiaoFiIconFlat: React.FC<LogoIconProps & { color?: string }> = ({
  size = 64,
  className,
  color = '#6C5CE7',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="MiaoFi icon"
  >
    {/* Left ear */}
    <polygon points="74,105 92,54 110,74" fill={color} />
    {/* Right ear */}
    <polygon points="182,105 164,54 146,74" fill={color} />
    {/* Head */}
    <ellipse cx="128" cy="130" rx="60" ry="55" fill={color} />
    {/* Left eye */}
    <ellipse cx="108" cy="124" rx="8" ry="11" fill="white" />
    <ellipse cx="110" cy="122" rx="2.5" ry="4" fill={color} opacity="0.5" />
    {/* Right eye */}
    <ellipse cx="148" cy="124" rx="8" ry="11" fill="white" />
    <ellipse cx="150" cy="122" rx="2.5" ry="4" fill={color} opacity="0.5" />
    {/* Nose */}
    <path d="M128 136 L125 141 L131 141 Z" fill="white" opacity="0.6" />
    {/* Coin on forehead */}
    <circle cx="128" cy="104" r="9" fill="#F59E0B" />
    <text x="128" y="108" textAnchor="middle" fontSize="9" fontWeight="800" fill="white" fontFamily="sans-serif">₿</text>
    {/* Raised paw */}
    <path d="M165 165 Q175 155 179 170 Q181 180 170 185 Q160 187 158 177 Z" fill={color} />
    <circle cx="168" cy="174" r="2.5" fill="white" opacity="0.4" />
  </svg>
);

interface FullLogoProps {
  height?: number;
  className?: string;
  dark?: boolean;
}

/**
 * Full horizontal logo: icon + "MiaoFi" wordmark
 */
export const MiaoFiFullLogo: React.FC<FullLogoProps> = ({ height = 48, className, dark = true }) => {
  const iconSize = height;
  const textColor = dark ? 'white' : '#1a1a2e';
  const fontSize = height * 0.55;

  return (
    <div className={`inline-flex items-center gap-2 ${className || ''}`} style={{ height }}>
      <MiaoFiIcon size={iconSize} />
      <span
        style={{
          fontSize,
          fontWeight: 800,
          color: textColor,
          fontFamily: '"DM Sans", sans-serif',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        Miao<span style={{ color: '#6C5CE7' }}>Fi</span>
      </span>
    </div>
  );
};

/**
 * Hero logo: larger, with optional tagline
 */
export const MiaoFiHeroLogo: React.FC<FullLogoProps & { tagline?: string }> = ({
  height = 80,
  className,
  dark = true,
  tagline,
}) => {
  const textColor = dark ? 'white' : '#1a1a2e';
  const subColor = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';

  return (
    <div className={`inline-flex flex-col items-center gap-3 ${className || ''}`}>
      <div className="inline-flex items-center gap-3">
        <MiaoFiIcon size={height} />
        <span
          style={{
            fontSize: height * 0.5,
            fontWeight: 800,
            color: textColor,
            fontFamily: '"DM Sans", sans-serif',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          Miao<span style={{ color: '#6C5CE7' }}>Fi</span>
        </span>
      </div>
      {tagline && (
        <span
          style={{
            fontSize: height * 0.16,
            color: subColor,
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          {tagline}
        </span>
      )}
    </div>
  );
};
