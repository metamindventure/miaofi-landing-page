interface Props {
  inputFocused?: boolean;
}

const AnimatedBackground = ({ inputFocused = false }: Props) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, hsl(220 14% 8%) 0%, hsl(220 14% 4%) 100%)',
        }}
      />

      {/* Primary glow — center, behind input */}
      <div
        className="absolute transition-all duration-1000"
        style={{
          top: '30%',
          left: '50%',
          width: '700px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: `radial-gradient(circle, hsl(165 82% 51% / ${inputFocused ? 0.08 : 0.04}) 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />

      {/* Secondary glow — top right accent */}
      <div
        className="absolute"
        style={{
          top: '10%',
          right: '15%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsl(220 60% 50% / 0.03) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground) / 0.15) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground) / 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Horizon line */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: '65%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 5%, hsl(var(--border)) 30%, hsl(var(--border)) 70%, transparent 95%)',
          opacity: 0.3,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
