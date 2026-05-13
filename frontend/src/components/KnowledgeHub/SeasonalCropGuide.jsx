import React from 'react';
import { Sun, CloudRain, Snowflake, Calendar, Droplets, Clock } from 'lucide-react';

const SeasonalCropGuide = () => {
  const seasons = [
    {
      name: 'Summer (Kharif)',
      period: 'June - Oct',
      icon: <Sun className="text-orange-500" />,
      bg: 'from-orange-50 to-white',
      crops: [
        { name: 'Rice', soil: 'Clayey/Loamy', water: 'High', duration: '120-150 Days' },
        { name: 'Maize', soil: 'Alluvial', water: 'Medium', duration: '90-110 Days' },
        { name: 'Cotton', soil: 'Black Soil', water: 'Moderate', duration: '160-180 Days' }
      ]
    },
    {
      name: 'Winter (Rabi)',
      period: 'Nov - April',
      icon: <Snowflake className="text-blue-500" />,
      bg: 'from-blue-50 to-white',
      crops: [
        { name: 'Wheat', soil: 'Loamy', water: 'Moderate', duration: '120-140 Days' },
        { name: 'Mustard', soil: 'Sandy Loam', water: 'Low', duration: '110-130 Days' },
        { name: 'Chickpea', soil: 'Well-drained', water: 'Low', duration: '90-120 Days' }
      ]
    },
    {
      name: 'Zaid (Spring)',
      period: 'March - June',
      icon: <CloudRain className="text-green-500" />,
      bg: 'from-green-50 to-white',
      crops: [
        { name: 'Watermelon', soil: 'Sandy', water: 'Moderate', duration: '80-100 Days' },
        { name: 'Cucumber', soil: 'Organic Rich', water: 'High', duration: '60-70 Days' },
        { name: 'Moong Dal', soil: 'Loamy', water: 'Low', duration: '60-75 Days' }
      ]
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      <div className="grid grid-cols-1 gap-12">
        {seasons.map((season, idx) => (
          <div key={idx} className={`rounded-[48px] p-8 bg-gradient-to-b ${season.bg} border border-white/20 shadow-xl overflow-hidden relative group`}>
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 transition-transform duration-1000">
              {React.cloneElement(season.icon, { size: 120 })}
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 bg-white rounded-[24px] flex items-center justify-center shadow-lg">
                  {React.cloneElement(season.icon, { size: 28 })}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-nature-dark">{season.name}</h3>
                  <p className="text-sm font-bold text-nature-dark/40 flex items-center gap-1.5 mt-1">
                    <Calendar size={14} /> {season.period}
                  </p>
                </div>
              </div>
 
              <div className="space-y-6">
                {season.crops.map((crop, cIdx) => (
                  <div key={cIdx} className="bg-white/70 backdrop-blur-sm p-6 rounded-[32px] border border-white shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-5">
                      <h4 className="text-lg font-black text-nature-dark">
                        {crop.name}
                      </h4>
                      <span className="text-[10px] font-black bg-nature-DEFAULT text-white px-3 py-1 rounded-full uppercase tracking-widest">
                        Primary Crop
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center text-center gap-1">
                        <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
                          <Droplets size={16} />
                        </div>
                        <p className="text-[9px] font-black text-nature-dark/40 uppercase tracking-widest">Water</p>
                        <p className="text-xs font-black text-nature-dark">{crop.water}</p>
                      </div>
                      <div className="flex flex-col items-center text-center gap-1">
                        <div className="w-8 h-8 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center">
                          <Clock size={16} />
                        </div>
                        <p className="text-[9px] font-black text-nature-dark/40 uppercase tracking-widest">Growth</p>
                        <p className="text-xs font-black text-nature-dark">{crop.duration.split(' ')[0]}D</p>
                      </div>
                      <div className="flex flex-col items-center text-center gap-1">
                        <div className="w-8 h-8 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center">
                          <Sun size={16} />
                        </div>
                        <p className="text-[9px] font-black text-nature-dark/40 uppercase tracking-widest">Soil</p>
                        <p className="text-xs font-black text-nature-dark truncate w-full" title={crop.soil}>{crop.soil}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonalCropGuide;
