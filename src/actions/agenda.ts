'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createSlot(prevState: any, formData: FormData) {
  try {
    const datetime = formData.get('datetime') as string;
    const duration = parseInt(formData.get('duration') as string) || 30;
    const meetType = (formData.get('meetType') as string) || 'teams';
    const meetUrl = ((formData.get('meetUrl') as string) || '').trim();

    if (!datetime) return { error: 'Date et heure requises.' };

    const date = new Date(datetime);
    if (isNaN(date.getTime())) return { error: 'Date invalide.' };
    if (date < new Date()) return { error: 'Impossible de créer un créneau dans le passé.' };

    await prisma.timeSlot.create({ data: { date, duration, meetType, meetUrl } });

    revalidatePath('/admin/agenda');
    revalidatePath('/');
    return { success: true };
  } catch (e: any) {
    return { error: e?.message ?? 'Une erreur est survenue.' };
  }
}

export async function deleteSlot(id: number, prevState: any, formData: FormData) {
  const password = formData.get('password') as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return { error: 'Mot de passe incorrect' };
  }

  await prisma.timeSlot.delete({ where: { id } });
  revalidatePath('/admin/agenda');
  revalidatePath('/');
  return { success: true };
}

export async function bookSlot(slotId: number, prevState: any, formData: FormData) {
  const nom = formData.get('nom') as string;
  const email = formData.get('email') as string;
  const tel = (formData.get('tel') as string) || '';
  const sujet = (formData.get('sujet') as string) || '';

  if (!nom || !email) return { error: 'Nom et email requis.' };

  const slot = await prisma.timeSlot.findUnique({
    where: { id: slotId },
    include: { booking: true },
  });

  if (!slot) return { error: 'Créneau introuvable.' };
  if (slot.isBooked || slot.booking) return { error: 'Ce créneau vient d\'être réservé. Choisissez-en un autre.' };
  if (slot.date < new Date()) return { error: 'Ce créneau est passé.' };

  await prisma.$transaction([
    prisma.timeSlot.update({ where: { id: slotId }, data: { isBooked: true } }),
    prisma.booking.create({ data: { slotId, nom, email, tel, sujet } }),
  ]);

  await sendBookingEmails({ slot, nom, email, tel, sujet }).catch(console.error);

  revalidatePath('/');
  revalidatePath('/admin/agenda');
  return { success: true };
}

async function sendBookingEmails({
  slot, nom, email, tel, sujet,
}: {
  slot: { date: Date; duration: number; meetType: string; meetUrl: string };
  nom: string; email: string; tel: string; sujet: string;
}) {
  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) return;

  const FROM = process.env.EMAIL_FROM ?? 'onboarding@resend.dev';
  const TO = process.env.EMAIL_TO ?? 'contact@primerenov.fr';

  const fmtDate = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' }).format(slot.date);
  const fmtTime = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' }).format(slot.date);

  const platformLabel: Record<string, string> = { teams: 'Microsoft Teams', meet: 'Google Meet', phone: 'Appel téléphonique' };
  const platform = platformLabel[slot.meetType] ?? slot.meetType;

  const meetRow = slot.meetUrl
    ? `<tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;width:160px">Lien réunion</td><td style="padding:8px"><a href="${slot.meetUrl}" style="color:#261E1A">${platform} — Rejoindre</a></td></tr>`
    : `<tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Plateforme</td><td style="padding:8px">${platform} (lien envoyé par email)</td></tr>`;

  const send = (to: string, subject: string, html: string) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: [to], subject, html }),
    });

  await send(email, `Rendez-vous confirmé — Prime Rénov`, `
    <div style="font-family:sans-serif;max-width:560px">
      <h2 style="color:#261E1A;margin-bottom:8px">Rendez-vous confirmé ✓</h2>
      <p style="color:#5A5A52">Bonjour ${nom}, votre rendez-vous avec Prime Rénov est enregistré.</p>
      <table style="border-collapse:collapse;width:100%;margin-top:20px">
        <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;width:160px">Date</td><td style="padding:8px">${fmtDate}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Heure</td><td style="padding:8px">${fmtTime}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Durée</td><td style="padding:8px">${slot.duration} min</td></tr>
        ${meetRow}
        <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Sujet</td><td style="padding:8px">${sujet || '—'}</td></tr>
      </table>
      <p style="color:#9A9A92;font-size:12px;margin-top:24px">Pour annuler ou reporter, répondez simplement à cet email.</p>
    </div>
  `);

  await send(TO, `Nouveau RDV — ${nom}`, `
    <div style="font-family:sans-serif;max-width:560px">
      <h2 style="color:#261E1A">Nouveau rendez-vous réservé</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;width:160px">Client</td><td style="padding:8px">${nom}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Téléphone</td><td style="padding:8px">${tel || '—'}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Sujet</td><td style="padding:8px">${sujet || '—'}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Date</td><td style="padding:8px">${fmtDate} à ${fmtTime}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Durée</td><td style="padding:8px">${slot.duration} min</td></tr>
      </table>
    </div>
  `);
}
