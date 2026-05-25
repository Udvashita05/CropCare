import React, { useState } from 'react';
import { Star, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

const ReviewSection = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setRating(0);
    setReview('');
  };

  return (
    <div className="card-premium animate-fade-in" style={{ marginTop: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <MessageSquare size={20} color="var(--primary-color)" />
        <h3 style={{ margin: 0 }}>Rate Your Experience</h3>
      </div>

      {submitted ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '12px' 
        }}>
          <div style={{ 
            background: 'rgba(16, 185, 129, 0.1)', 
            padding: '16px', 
            borderRadius: '50%',
            color: 'var(--success-color)'
          }}>
            <CheckCircle2 size={32} />
          </div>
          <p style={{ fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>Thank you for your feedback!</p>
          <p style={{ fontSize: '13px', margin: 0 }}>Your review helps us grow together.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                className={hover >= star || rating >= star ? 'pulse-soft' : ''}
              >
                <Star
                  size={32}
                  fill={hover >= star || rating >= star ? 'var(--accent-color)' : 'none'}
                  color={hover >= star || rating >= star ? 'var(--accent-color)' : 'var(--text-muted)'}
                  style={{ 
                    strokeWidth: 1.5,
                    filter: hover >= star || rating >= star ? 'drop-shadow(0 0 5px rgba(255, 193, 7, 0.4))' : 'none'
                  }}
                />
              </button>
            ))}
          </div>

          <div className="input-field-group">
            <textarea
              placeholder="Tell us how we can improve..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '16px',
                borderRadius: 'var(--border-radius-md)',
                background: 'var(--bg-color)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                fontSize: '15px',
                resize: 'none',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={rating === 0}
            style={{ 
              opacity: rating === 0 ? 0.6 : 1,
              marginTop: '12px'
            }}
          >
            <Send size={18} /> Submit Review
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewSection;
