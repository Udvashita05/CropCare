import mongoose from 'mongoose';

const searchHistorySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  query: { type: String, required: true },
  results: [
    {
      name: { type: String, required: true },
      crop: { type: String, required: true },
      severity: { type: String, required: true },
      symptoms: { type: String, required: true },
      causes: { type: String, required: true },
      prevention: { type: String, required: true },
      treatment: { type: String, required: true },
      image: { type: String }
    }
  ],
  source: { type: String, required: true, enum: ['datafile', 'gemini'] },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('SearchHistory', searchHistorySchema);
