'use server';

import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
  const password = formData.get('password') as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { error: 'Mot de passe incorrect' };
  }

  await createSession();
  redirect('/admin');
}

export async function logout() {
  await deleteSession();
  redirect('/admin/login');
}
