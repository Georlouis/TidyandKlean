import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import User from '../src/models/User';

dotenv.config({ path: '.env.local' });
const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
  if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
  }
  
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to DB');
  
  const email = "admin@tidyandklean.com";
  const plainPassword = "SuperAdminPassword2026!"; // Secure temporary password

  const existingAdmin = await User.findOne({ email });
  if (existingAdmin) {
    console.log("Admin user already exists!");
    process.exit(0);
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(plainPassword, salt);

  await User.create({
    name: "Administrador Principal",
    email,
    passwordHash,
    role: "admin"
  });

  console.log(`\n✅ Admin user created successfully!`);
  console.log(`Email: ${email}`);
  console.log(`Password: ${plainPassword}`);
  console.log(`⚠️ Guarda esta contraseña. Si lo deseas, podrás cambiarla después.\n`);

  await mongoose.disconnect();
}

run();
