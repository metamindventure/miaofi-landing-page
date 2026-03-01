const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay" />

      {/* Gradient mesh blobs */}
      <div className="mesh-blob mesh-blob-1" style={{ top: '10%', left: '20%' }} />
      <div className="mesh-blob mesh-blob-2" style={{ top: '50%', right: '10%' }} />
      <div className="mesh-blob mesh-blob-3" style={{ top: '30%', left: '60%' }} />

      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${8 + (i * 7.5) % 90}%`,
            bottom: '-10px',
            animationDuration: `${12 + (i * 3)}s`,
            animationDelay: `${i * 1.2}s`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
