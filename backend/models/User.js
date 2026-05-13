import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String },
  crop_type: { type: String },
  land_size: { type: Number },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
