import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const dbConnect = async () => {
  const db = process.env.MONGODB_URI;
  console.log(process.env.MONGODB_URI);
  await mongoose
    .connect(db)
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Could not connect to MongoDB...', err));
};

export default dbConnect;
