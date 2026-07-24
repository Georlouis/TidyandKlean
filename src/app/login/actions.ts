"use server";

import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { createSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Por favor, ingrese correo y contraseña.' };
  }

  await dbConnect();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { error: 'Credenciales inválidas.' };
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return { error: 'Credenciales inválidas.' };
    }

    // Passwords match, create session
    await createSession(user._id.toString(), user.role);
    
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Ocurrió un error inesperado. Intente de nuevo.' };
  }
  
  // Redirect happens outside the try-catch to avoid catching the NEXT_REDIRECT error
  redirect('/admin');
}
