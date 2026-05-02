'use server';

import { prisma } from '@/lib/prisma';

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

// Resend n'accepte un from personnalisé que si le domaine est vérifié.
// Sans domaine vérifié, utiliser onboarding@resend.dev.
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

  const { ok, error } = await callResend({
    from: FROM,
    to: [TO],
    subject: `Message de ${nom} — Contact`,
    reply_to: email,
    html: `
      <h2 style="color:#1A3A5C">Nouveau message — Formulaire Contact</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;font-weight:bold;width:120px">Nom</td><td style="padding:8px">${nom}</td></tr>
        <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px;font-weight:bold">Message</td><td style="padding:8px">${msg.replace(/\n/g, '<br>')}</td></tr>
      </table>
    `,
  });

  return ok ? { success: true } : { error };
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

  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px;font-weight:bold;width:160px;background:#f5f5f5">${label}</td><td style="padding:8px">${value || '—'}</td></tr>`;

  const { ok, error } = await callResend({
    from: FROM,
    to: [TO],
    subject: `Demande de devis — ${nom}`,
    reply_to: email,
    html: `
      <h2 style="color:#1A3A5C">Nouvelle demande de devis</h2>
      <table style="border-collapse:collapse;width:100%">
        ${row('Nom', nom)}
        ${row('Email', `<a href="mailto:${email}">${email}</a>`)}
        ${row('Téléphone', tel)}
        ${row('Type de projet', type)}
        ${row('Description', desc)}
        ${row('Surface', surface)}
        ${row('Localisation', lieu)}
        ${row('Budget', budget)}
        ${row('Délai', delai)}
        ${row('Message', msg ? msg.replace(/\n/g, '<br>') : '')}
      </table>
    `,
  });

  return ok ? { success: true } : { error };
}
