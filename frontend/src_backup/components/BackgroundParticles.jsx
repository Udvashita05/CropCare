import { Leaf, Sparkles, Wind } from 'lucide-react';

const BackgroundParticles = () => {
  return (
    <div className="particles-container" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <div className="floating-particle" style={{ top: '10%', left: '10%', '--duration': '8s', '--opacity': '0.15' }}>
        <Leaf size={40} color="var(--primary-color)" />
      </div>
      <div className="floating-particle" style={{ top: '60%', left: '80%', '--duration': '10s', '--opacity': '0.1' }}>
        <Wind size={30} color="var(--primary-light)" />
      </div>
      <div className="floating-particle" style={{ top: '30%', left: '70%', '--duration': '7s', '--opacity': '0.2' }}>
        <Sparkles size={24} color="var(--accent-color)" />
      </div>
      <div className="floating-particle" style={{ top: '80%', left: '20%', '--duration': '12s', '--opacity': '0.1' }}>
        <Leaf size={50} color="var(--secondary-color)" />
      </div>
    </div>
  );
};

export default BackgroundParticles;
