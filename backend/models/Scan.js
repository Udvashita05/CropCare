import mongoose from 'mongoose';

const scanSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image_url: { type: String, required: true },
  disease_name: { type: String, required: true },
  confidence: { type: Number, required: true },
  severity: { type: String, required: true },
  remedies: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Scan', scanSchema);
