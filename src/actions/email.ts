'use server';

import { prisma } from '@/lib/prisma';
import { contactConfirmHtml, devisConfirmHtml } from '@/lib/emails';

async function callResend(payload: object): Promise<{ ok: boolean; error?: string }> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return { ok: false, error: "Service d'email non configuré." };

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    console.error('[Resend error]', res.status, body);
    return { ok: false, error: (body as any).message ?? "Erreur lors de l'envoi." };
  }

  return { ok: true };
}

const FROM = process.env.EMAIL_FROM ?? 'onboarding@resend.dev';
const TO   = process.env.EMAIL_TO   ?? 'contact@primerenov.fr';

export async function sendContact(prevState: any, formData: FormData) {
  const nom   = formData.get('nom')   as string;
  const email = formData.get('email') as string;
  const msg   = formData.get('msg')   as string;

  if (!nom || !email || !msg) return { error: 'Tous les champs sont requis.' };

  await prisma.devisRequest.create({
    data: { source: 'contact', nom, email, msg },
  }).catch(console.error);

  // Notification admin
  const { ok, error } = await callResend({
    from: FROM,
    to: [TO],
    subject: `Message de ${nom} — Contact`,
    reply_to: email,
    html: `
      <h2 style="color:#261E1A">Nouveau message — Formulaire Contact</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;font-weight:bold;width:120px;background:#f5f5f5">Nom</td><td style="padding:8px">${nom}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Message</td><td style="padding:8px">${msg.replace(/\n/g, '<br>')}</td></tr>
      </table>
    `,
  });

  if (!ok) return { error };

  // Confirmation client
  await callResend({
    from: FROM,
    to: [email],
    reply_to: TO,
    subject: 'Votre message a bien été reçu — Prime Rénov',
    html: contactConfirmHtml(nom, msg),
  }).catch(console.error);

  return { success: true };
}

export async function sendDevis(prevState: any, formData: FormData) {
  const nom     = formData.get('nom')     as string;
  const email   = formData.get('email')   as string;
  const tel     = formData.get('tel')     as string;
  const type    = formData.get('type')    as string;
  const desc    = formData.get('desc')    as string;
  const surface = formData.get('surface') as string;
  const lieu    = formData.get('lieu')    as string;
  const budget  = formData.get('budget')  as string;
  const delai   = formData.get('delai')   as string;
  const msg     = formData.get('msg')     as string;

  if (!nom || !email) return { error: "Le nom et l'email sont requis." };

  await prisma.devisRequest.create({
    data: { source: 'devis', nom, email, tel: tel ?? '', type: type ?? '', desc: desc ?? '', surface: surface ?? '', lieu: lieu ?? '', budget: budget ?? '', delai: delai ?? '', msg: msg ?? '' },
  }).catch(console.error);

  const tableRow = (label: string, value: string) =>
    `<tr><td style="padding:8px;font-weight:bold;width:160px;background:#f5f5f5">${label}</td><td style="padding:8px">${value || '—'}</td></tr>`;

  // Notification admin
  const { ok, error } = await callResend({
    from: FROM,
    to: [TO],
    subject: `Demande de devis — ${nom}`,
    reply_to: email,
    html: `
      <h2 style="color:#261E1A">Nouvelle demande de devis</h2>
      <table style="border-collapse:collapse;width:100%">
        ${tableRow('Nom', nom)}
        ${tableRow('Email', `<a href="mailto:${email}">${email}</a>`)}
        ${tableRow('Téléphone', tel)}
        ${tableRow('Type de projet', type)}
        ${tableRow('Description', desc)}
        ${tableRow('Surface', surface)}
        ${tableRow('Localisation', lieu)}
        ${tableRow('Budget', budget)}
        ${tableRow('Délai', delai)}
        ${tableRow('Message', msg ? msg.replace(/\n/g, '<br>') : '')}
      </table>
    `,
  });

  if (!ok) return { error };

  // Confirmation client
  await callResend({
    from: FROM,
    to: [email],
    reply_to: TO,
    subject: 'Votre demande de devis a été reçue — Prime Rénov',
    html: devisConfirmHtml({ nom, email, tel, type, desc, surface, lieu, budget, delai, msg }),
  }).catch(console.error);

  return { success: true };
}
