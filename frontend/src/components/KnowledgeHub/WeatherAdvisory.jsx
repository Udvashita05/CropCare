import React from 'react';
import { CloudRain, Thermometer, Wind, Droplets, AlertTriangle, ShieldCheck } from 'lucide-react';

const WeatherAdvisory = () => {
  const alerts = [
    {
      id: 1,
      type: 'Warning',
      icon: <CloudRain className="text-blue-500" />,
      title: 'Rain Expected',
      desc: 'Significant rainfall expected in the next 24 hours. Avoid spraying liquid fertilizers or pesticides today to prevent runoff.',
      bg: 'bg-blue-50 border-blue-100',
      accent: 'text-blue-800'
    },
    {
      id: 2,
      type: 'Alert',
      icon: <Thermometer className="text-red-500" />,
      title: 'High Humidity',
      desc: 'Conditions are favorable for fungal infections. Monitor your potato and tomato crops closely for signs of late blight.',
      bg: 'bg-red-50 border-red-100',
      accent: 'text-red-800'
    },
    {
      id: 3,
      type: 'Good Time',
      icon: <ShieldCheck className="text-green-500" />,
      title: 'Clear Weather',
      desc: 'Ideal conditions for harvesting and soil tilling. Wind speeds are low, making it a good time for maintenance.',
      bg: 'bg-green-50 border-green-100',
      accent: 'text-green-800'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alerts.map((alert) => (
          <div key={alert.id} className={`${alert.bg} p-6 rounded-3xl border-2 transition-all hover:shadow-lg`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                {alert.icon}
              </div>
              <span className={`text-xs font-black uppercase tracking-widest ${alert.accent}`}>{alert.type}</span>
            </div>
            <h3 className={`text-lg font-bold mb-2 ${alert.accent}`}>{alert.title}</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{alert.desc}</p>
          </div>
        ))}
      </div>
      
      {/* Live Contextual Alert */}
      <div className="bg-nature-light rounded-3xl p-8 border border-nature-DEFAULT/10 flex flex-col md:flex-row items-center gap-8">
        <div className="shrink-0 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner">
          <Wind size={48} className="text-nature-DEFAULT" />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-nature-dark mb-2">Smart AI Recommendation</h3>
          <p className="text-nature-dark text-sm leading-relaxed max-w-2xl">
            Based on current wind speeds and soil moisture in your region, we recommend postponing any light dusting of seeds. 
            However, this is an excellent window for deep-root irrigation to prepare for the upcoming dry spell.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherAdvisory;
