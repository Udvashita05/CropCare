import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Scan from './models/Scan.js';

dotenv.config();

const checkData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const userCount = await User.countDocuments();
    const scanCount = await Scan.countDocuments();
    
    console.log(`Users: ${userCount}`);
    console.log(`Scans: ${scanCount}`);
    
    if (userCount > 0) {
      const users = await User.find().limit(5);
      console.log('Users:', users);
    }
    
    if (scanCount > 0) {
      const scans = await Scan.find().limit(5);
      console.log('Scans:', scans);
    }
    
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
};

checkData();
