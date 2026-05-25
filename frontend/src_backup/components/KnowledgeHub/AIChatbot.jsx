import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Mic, Volume2, X, Minimize2, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello! I am your CropCare AI Assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const { t, language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        'en': "Based on your description, it might be a nutrient deficiency. Have you checked the soil pH recently?",
        'hi': "आपके विवरण के आधार पर, यह पोषक तत्वों की कमी हो सकती है। क्या आपने हाल ही में मिट्टी के पीएच की जाँच की है?",
        'bn': "আপনার বর্ণনা অনুযায়ী, এটি পুষ্টির অভাব হতে পারে। আপনি কি সম্প্রতি মাটির pH পরীক্ষা করেছেন?",
        'mr': "तुमच्या वर्णनानुसार, हे पोषक तत्वांची कमतरता असू शकते. तुम्ही अलीकडे मातीचा pH तपासला आहे का?",
        'ta': "உங்கள் விளக்கத்தின் அடிப்படையில், இது ஊட்டச்சத்து குறைபாடாக இருக்கலாம். சமீபத்தில் மண்ணின் pH ஐ பரிசோதித்தீர்களா?",
        'te': "మీ వివరణ ఆధారంగా, ఇది పోషక లోపం కావచ్చు. మీరు ఇటీవల నేల pHని తనిఖీ చేశారా?"
      };
      
      const botMessage = { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: responses[language] || responses['en']
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Auto-speak if it's a short response
      // speakText(botMessage.text);
    }, 1500);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'en' ? 'en-US' : language;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      handleSend(transcript);
    };

    recognition.start();
  };

  const speakText = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = { hi: 'hi-IN', bn: 'bn-IN', mr: 'mr-IN', ta: 'ta-IN', te: 'te-IN', en: 'en-US' };
    utterance.lang = langMap[language] || 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-nature-DEFAULT text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 z-50 group"
      >
        <Sparkles className="absolute -top-2 -left-2 text-yellow-400 group-hover:animate-bounce" size={24} />
        <MessageSquare size={32} />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-80 md:w-96 bg-white/90 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 z-50 flex flex-col ${isMinimized ? 'h-16' : 'h-[500px]'}`}>
      {/* Header */}
      <div className="bg-nature-DEFAULT p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-tight">CropCare AI</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-[10px] opacity-80">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/10 rounded">
            <Minimize2 size={18} />
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded">
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.type === 'user' 
                    ? 'bg-nature-DEFAULT text-white rounded-tr-none' 
                    : 'bg-nature-light text-nature-dark rounded-tl-none border border-nature-DEFAULT/10'
                }`}>
                  {msg.text}
                  {msg.type === 'bot' && (
                    <button onClick={() => speakText(msg.text)} className="block mt-2 opacity-60 hover:opacity-100">
                      <Volume2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-nature-light p-3 rounded-2xl rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-nature-DEFAULT/40 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-nature-DEFAULT/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-nature-DEFAULT/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-nature-light bg-white/50">
            <div className="flex items-center gap-2 bg-nature-light rounded-2xl p-2 px-4 focus-within:ring-2 ring-nature-DEFAULT/20 transition-all">
              <input 
                type="text" 
                placeholder="Ask something..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-nature-dark"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
              />
              <button 
                onClick={startListening}
                className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'text-nature-DEFAULT hover:bg-nature-DEFAULT/10'}`}
              >
                <Mic size={18} />
              </button>
              <button 
                onClick={() => handleSend(inputValue)}
                className="bg-nature-DEFAULT text-white p-2 rounded-xl hover:shadow-lg active:scale-95 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIChatbot;
