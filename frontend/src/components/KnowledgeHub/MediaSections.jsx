import React, { useState, useEffect } from 'react';
import { Play, Star, TrendingUp, Users, Loader2 } from 'lucide-react';
import API_BASE_URL from '../../config';

export const VideoLearningCenter = ({ searchQuery = 'Organic Farming' }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/youtube/search?query=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) throw new Error('Failed to fetch videos');
        const data = await response.json();
        setVideos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchQuery]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 bg-white/20 rounded-[40px] border border-white/20">
      <Loader2 className="animate-spin text-nature-DEFAULT mb-4" size={48} />
      <p className="font-bold text-nature-dark/60 uppercase tracking-widest text-xs">Fetching Tutorials...</p>
    </div>
  );

  if (error) return (
    <div className="p-8 bg-red-50 rounded-[40px] border border-red-100 text-center">
      <p className="text-red-500 font-bold">Failed to load videos. Please try again later.</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video, idx) => (
        <a 
          key={video.id} 
          href={video.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white/60 rounded-[32px] overflow-hidden border border-white/40 group hover:shadow-xl transition-all cursor-pointer flex flex-col"
        >
          <div className="relative h-40 overflow-hidden shrink-0">
            <img src={video.thumb} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-nature-DEFAULT shadow-lg scale-90 group-hover:scale-100 transition-all">
                <Play size={24} fill="currentColor" />
              </div>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between">
            <h4 className="font-bold text-sm text-nature-dark line-clamp-2 leading-snug">{video.title}</h4>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-[10px] text-nature-DEFAULT font-black uppercase tracking-wider">{video.channel}</p>
              <div className="bg-nature-light/50 px-2 py-1 rounded-md">
                <p className="text-[9px] font-bold text-nature-dark/60 uppercase">Tutorial</p>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export const SuccessStories = () => {
  const stories = [
    { name: 'Rajesh Kumar', crop: 'Rice', increase: '35%', image: '/farmer_success_story_1_1777741261551.png' },
    { name: 'Sunita Devi', crop: 'Tomato', increase: '50%', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {stories.map((story, idx) => (
        <div key={idx} className="bg-white/40 backdrop-blur-md rounded-[40px] p-8 border border-white/20 flex items-center gap-8 shadow-lg">
          <div className="w-24 h-24 rounded-[32px] overflow-hidden shrink-0 shadow-xl border-4 border-white">
            <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="#ffc107" color="#ffc107" />)}
            </div>
            <h4 className="text-xl font-black text-nature-dark">{story.name}</h4>
            <p className="text-sm text-nature-dark/60 mb-4">{story.crop} Cultivator</p>
            <div className="flex items-center gap-2 text-nature-DEFAULT bg-nature-light w-fit px-3 py-1 rounded-full border border-nature-DEFAULT/10">
              <TrendingUp size={14} />
              <span className="text-xs font-bold">+{story.increase} Yield Growth</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
