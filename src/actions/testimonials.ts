'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addTestimonial(prevState: any, formData: FormData) {
  try {
    await prisma.testimonial.create({
      data: {
        name: formData.get('name') as string,
        role: formData.get('role') as string,
        text: formData.get('text') as string,
        rating: parseInt(formData.get('rating') as string),
        avatar: formData.get('avatar') as string,
      },
    });
    revalidatePath('/');
    revalidatePath('/admin/testimonials');
    return { success: true };
  } catch (e: any) {
    console.error('[addTestimonial]', e);
    return { error: e?.message ?? "Une erreur est survenue lors de l'ajout." };
  }
}

export async function updateTestimonial(id: number, formData: FormData) {
  await prisma.testimonial.update({
    where: { id },
    data: {
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      text: formData.get('text') as string,
      rating: parseInt(formData.get('rating') as string),
      avatar: formData.get('avatar') as string,
    },
  });
  revalidatePath('/');
  revalidatePath('/admin/testimonials');
  redirect('/admin/testimonials');
}

export async function deleteTestimonial(id: number, prevState: any, formData: FormData) {
  const password = formData.get('password') as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return { error: 'Mot de passe incorrect' };
  }

  await prisma.testimonial.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/testimonials');
  return { success: true };
}
