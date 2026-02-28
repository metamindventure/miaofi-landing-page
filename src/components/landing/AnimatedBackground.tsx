const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="blob-purple" style={{ top: '10%', left: '20%' }} />
      <div className="blob-teal" style={{ top: '50%', right: '10%' }} />
    </div>
  );
};

export default AnimatedBackground;
