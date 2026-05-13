import React from 'react';
import { Landmark, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

const GovtSchemes = () => {
  const schemes = [
    {
      name: 'PM-KISAN',
      desc: 'Income support of ₹6,000 per year to all landholding farmer families in three equal installments.',
      benefits: ['Direct Bank Transfer', 'Zero Interest', 'National Reach'],
      color: 'bg-orange-50 border-orange-200',
      image: '/govt_kisan.png'
    },
    {
      name: 'Fasal Bima Yojana',
      desc: 'Crop insurance scheme for farmers for their yields to protect them from natural calamities.',
      benefits: ['Low Premium', 'Quick Claims', 'All-Crop Coverage'],
      color: 'bg-green-50 border-green-200',
      image: '/govt_insurance.png'
    },
    {
      name: 'Agri Infrastructure Fund',
      desc: 'Financing facility for investment in viable projects for post-harvest management infrastructure.',
      benefits: ['Credit Guarantee', 'Interest Subvention', '10 Year Tenure'],
      color: 'bg-blue-50 border-blue-200',
      image: '/govt_agri_fund.png'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {schemes.map((scheme, idx) => (
        <div key={idx} className={`${scheme.color} border-2 rounded-[40px] hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col`}>
          <div className="h-40 overflow-hidden relative">
            <img src={scheme.image} alt={scheme.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-xl opacity-80">
              <Landmark size={20} className="text-nature-DEFAULT" />
            </div>
          </div>
          
          <div className="relative z-10 p-8 pt-6">
            <h3 className="text-2xl font-black text-nature-dark mb-4">{scheme.name}</h3>
            <p className="text-sm text-nature-dark/70 leading-relaxed mb-6">{scheme.desc}</p>
            
            <ul className="space-y-3 mb-8">
              {scheme.benefits.map((benefit, bIdx) => (
                <li key={bIdx} className="flex items-center gap-2 text-xs font-bold text-nature-dark/80">
                  <CheckCircle2 size={14} className="text-nature-DEFAULT" /> {benefit}
                </li>
              ))}
            </ul>

            <button className="flex items-center gap-2 text-sm font-black text-nature-DEFAULT group-hover:gap-4 transition-all">
              Apply Now <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GovtSchemes;
