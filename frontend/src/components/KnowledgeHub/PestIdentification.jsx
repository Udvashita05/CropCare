import React from 'react';
import { Bug, ShieldAlert, Target, Info } from 'lucide-react';

const PestIdentification = () => {
  const pests = [
    {
      id: 1,
      name: "Desert Locust",
      scientific: "Schistocerca gregaria",
      image: "/pest_locust.png",
      damage: "Large swarms can strip an entire field of crops in hours. High risk during monsoon.",
      prevention: "Monitoring swarms, using bio-pesticides (Metarhizium), and community alerts."
    },
    {
      id: 2,
      name: "Aphids",
      scientific: "Aphidoidea",
      image: "/pest_aphid.png",
      damage: "Sucks sap from stems and leaves, causing curling and spreading viral diseases.",
      prevention: "Encourage natural predators like ladybugs, use neem oil sprays, or yellow sticky traps."
    },
    {
      id: 3,
      name: "Fall Armyworm",
      scientific: "Spodoptera frugiperda",
      image: "/pest_armyworm.png",
      damage: "Chews leaves, stems, and reproductive parts of various crops, especially maize.",
      prevention: "Early detection, pheromone traps, and application of Bacillius thuringiensis (Bt)."
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-8 p-4">
      {pests.map((pest) => (
        <div key={pest.id} className="group h-[400px] [perspective:1000px]">
          <div className="relative h-full w-full rounded-3xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xl">
            {/* Front Side */}
            <div className="absolute inset-0 h-full w-full rounded-3xl [backface-visibility:hidden] overflow-hidden">
              <img src={pest.image} alt={pest.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-nature-accent text-xs font-black uppercase tracking-widest">{pest.scientific}</span>
                <h3 className="text-white text-2xl font-black mt-1">{pest.name}</h3>
                <div className="flex items-center gap-2 mt-4 text-white/60 text-xs">
                  <Info size={14} /> <span>Hover to see identification details</span>
                </div>
              </div>
            </div>

            {/* Back Side */}
            <div className="absolute inset-0 h-full w-full rounded-3xl bg-nature-DEFAULT [backface-visibility:hidden] [transform:rotateY(180deg)] p-8 flex flex-col text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bug size={24} />
                </div>
                <h3 className="text-xl font-bold">{pest.name}</h3>
              </div>

              <div className="space-y-6 flex-1 overflow-y-auto">
                <div>
                  <h4 className="text-nature-accent text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-1">
                    <ShieldAlert size={12} /> Damage Type
                  </h4>
                  <p className="text-sm leading-relaxed text-white">{pest.damage}</p>
                </div>

                <div>
                  <h4 className="text-nature-accent text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-1">
                    <Target size={12} /> Control Method
                  </h4>
                  <p className="text-sm leading-relaxed text-white">{pest.prevention}</p>
                </div>
              </div>

              <button className="mt-auto w-full py-3 bg-white text-nature-DEFAULT rounded-xl font-bold text-sm hover:bg-nature-accent hover:text-white transition-all active:scale-95">
                Full Identification Guide
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PestIdentification;
