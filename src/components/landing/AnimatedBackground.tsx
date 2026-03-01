const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base radial gradient — subtle purple glow at top */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(88, 28, 135, 0.18) 0%, transparent 70%)',
        }}
      />

      {/* Secondary warm glow bottom-right */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 80% 80%, rgba(108, 92, 231, 0.06) 0%, transparent 70%)',
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay" />

      {/* Dot pattern for extra texture */}
      <div className="absolute inset-0 dot-pattern" />

      {/* Gradient mesh blobs — increased opacity */}
      <div className="mesh-blob mesh-blob-1" style={{ top: '5%', left: '15%' }} />
      <div className="mesh-blob mesh-blob-2" style={{ top: '45%', right: '5%' }} />
      <div className="mesh-blob mesh-blob-3" style={{ top: '25%', left: '55%' }} />
      {/* Extra purple blob for hero area */}
      <div className="mesh-blob mesh-blob-hero" style={{ top: '-5%', left: '30%' }} />

      {/* Floating particles */}
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${5 + (i * 6.2) % 90}%`,
            bottom: '-10px',
            animationDuration: `${10 + (i * 2.5)}s`,
            animationDelay: `${i * 0.9}s`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
