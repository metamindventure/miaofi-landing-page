interface Props {
  inputFocused?: boolean;
}

const AnimatedBackground = ({ inputFocused = false }: Props) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid" />

      {/* Vortex — concentric rings radiating from center */}
      <div
        className="absolute"
        style={{
          top: '45%',
          left: '50%',
          width: '900px',
          height: '900px',
          animation: 'vortex-rotate 60s linear infinite',
          transformOrigin: 'center',
        }}
      >
        {/* Rings at varying sizes/opacities */}
        {[
          { size: 900, color: '#6366F1', opacity: 0.04 },
          { size: 650, color: '#8B5CF6', opacity: 0.05 },
          { size: 400, color: '#A78BFA', opacity: 0.06 },
        ].map((ring, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: ring.size,
              height: ring.size,
              top: '50%',
              left: '50%',
              marginTop: -ring.size / 2,
              marginLeft: -ring.size / 2,
              border: `1px solid rgba(139, 92, 246, ${ring.opacity})`,
              background: `radial-gradient(circle, ${ring.color}${Math.round(ring.opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>

      {/* Light cone — spotlight on input area */}
      <div
        className="absolute transition-opacity duration-700"
        style={{
          top: '-5%',
          left: '50%',
          width: '300px',
          height: '80vh',
          marginLeft: '-150px',
          background: 'linear-gradient(180deg, rgba(139,92,246,0.06) 0%, rgba(255,255,255,0.02) 40%, transparent 100%)',
          clipPath: 'polygon(35% 0%, 65% 0%, 80% 100%, 20% 100%)',
          opacity: inputFocused ? 1.6 : 1,
        }}
      />

      {/* Center glow — intensifies on focus */}
      <div
        className="absolute transition-all duration-500"
        style={{
          top: '38%',
          left: '50%',
          width: '500px',
          height: '500px',
          marginLeft: '-250px',
          marginTop: '-100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: inputFocused ? 0.35 : 0.15,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
