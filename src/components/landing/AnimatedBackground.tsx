interface Props {
  inputFocused?: boolean;
}

const AnimatedBackground = ({ inputFocused = false }: Props) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid" />

      {/* Orbs */}
      <div className="orb orb-violet" style={{ top: '5%', right: '10%' }} />
      <div className="orb orb-teal" style={{ bottom: '15%', left: '5%' }} />
      <div
        className={`orb orb-center ${inputFocused ? 'orb-active' : ''}`}
        style={{ top: '35%', left: '50%', transform: 'translateX(-50%)' }}
      />
    </div>
  );
};

export default AnimatedBackground;
