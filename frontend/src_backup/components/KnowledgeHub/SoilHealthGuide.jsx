import React from 'react';
import { Droplets, Thermometer, Wind, Zap, FlaskConical, AlertCircle } from 'lucide-react';

const SoilHealthGuide = () => {
  const soilTypes = [
    { name: 'Alluvial', characteristics: 'Rich in potash, very fertile', suitability: 'Rice, Wheat, Sugarcane' },
    { name: 'Black', characteristics: 'Clayey texture, retains moisture', suitability: 'Cotton, Soybeans' },
    { name: 'Red', characteristics: 'Porous and friable structure', suitability: 'Millets, Pulses, Tobacco' }
  ];

  return (
    <div className="space-y-12 p-4">
      {/* Soil Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {soilTypes.map((type, idx) => (
          <div key={idx} className="bg-white/40 backdrop-blur-md p-6 rounded-[32px] border border-white/20 shadow-xl hover:-translate-y-2 transition-all duration-500">
            <div className="w-12 h-12 bg-nature-DEFAULT text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <FlaskConical size={24} />
            </div>
            <h3 className="text-xl font-black text-nature-dark mb-2">{type.name} Soil</h3>
            <p className="text-sm text-nature-dark/70 mb-4">{type.characteristics}</p>
            <div className="pt-4 border-t border-nature-DEFAULT/10">
              <p className="text-[10px] font-bold text-nature-DEFAULT uppercase tracking-widest">Best For</p>
              <p className="text-sm font-semibold text-nature-dark">{type.suitability}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Nutrient Dashboard */}
      <div className="bg-nature-dark rounded-[48px] p-8 md:p-12 text-white overflow-hidden relative">
        <img src="/soil_infographic.png" className="absolute top-0 right-0 w-80 h-full object-contain opacity-20 -rotate-12 translate-x-16" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-nature-accent/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-nature-accent font-black uppercase tracking-[0.2em] text-xs">Soil Analysis</span>
            <h2 className="text-4xl font-black mt-4 mb-6 leading-tight">Mastering Your <br/> Soil Nutrients (NPK)</h2>
            <p className="text-white leading-relaxed mb-8 max-w-md text-sm md:text-base">
              The Nitrogen (N), Phosphorus (P), and Potassium (K) ratio is critical for crop health. 
              Monitor these levels regularly to ensure optimal growth and prevent deficiencies.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                <AlertCircle size={16} className="text-nature-accent" />
                <span className="text-xs font-bold">Monitor pH Levels (6.0 - 7.5)</span>
              </div>
            </div>
          </div>

          <div className="space-y-8 bg-white/5 backdrop-blur-sm p-8 rounded-[40px] border border-white/10">
            {/* Nitrogen */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="font-bold tracking-widest text-xs opacity-60">NITROGEN (N)</span>
                <span className="text-nature-accent font-black">75%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                <div className="h-full bg-gradient-to-r from-blue-400 to-nature-accent rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-[10px] text-white italic">Essential for leaf growth and lush green color.</p>
            </div>

            {/* Phosphorus */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="font-bold tracking-widest text-xs opacity-60">PHOSPHORUS (P)</span>
                <span className="text-nature-accent font-black">45%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                <div className="h-full bg-gradient-to-r from-orange-400 to-nature-accent rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-[10px] text-white italic">Critical for root development and flower/fruit production.</p>
            </div>

            {/* Potassium */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="font-bold tracking-widest text-xs opacity-60">POTASSIUM (K)</span>
                <span className="text-nature-accent font-black">90%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                <div className="h-full bg-gradient-to-r from-purple-400 to-nature-accent rounded-full" style={{ width: '90%' }}></div>
              </div>
              <p className="text-[10px] text-white italic">Boosts disease resistance and overall plant vigor.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilHealthGuide;
