import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const testInsert = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected...');
    
    const countBefore = await User.countDocuments();
    console.log('Count before:', countBefore);
    
    const newUser = await User.create({
      full_name: 'Database Tester',
      email: `test_${Date.now()}@example.com`,
      password: 'password123'
    });
    
    console.log('User created:', newUser.full_name);
    
    const countAfter = await User.countDocuments();
    console.log('Count after:', countAfter);
    
    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Error:', err);
  }
};

testInsert();
