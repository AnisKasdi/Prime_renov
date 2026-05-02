'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateDevisStatus(id: number, status: string) {
  await prisma.devisRequest.update({ where: { id }, data: { status } });
  revalidatePath('/admin/demandes');
}

export async function deleteDevisRequest(id: number, prevState: any, formData: FormData) {
  const password = formData.get('password') as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return { error: 'Mot de passe incorrect' };
  }

  await prisma.devisRequest.delete({ where: { id } });
  revalidatePath('/admin/demandes');
  return { success: true };
}
