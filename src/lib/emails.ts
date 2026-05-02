// All CSS must be inline — email clients don't support stylesheets.
// Table-based layout for Outlook compatibility.

const SITE_URL = process.env.NEXT_PUBLIC_URL ?? 'https://primerenov.fr';

function shell(content: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#F0F0EC;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F0F0EC;">
<tr><td align="center" style="padding:40px 20px;">

  <table width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;">

    <!-- HEADER -->
    <tr>
      <td style="background-color:#14100E;padding:26px 36px;">
        <table cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="width:36px;height:36px;border:1.5px solid #C67C4E;text-align:center;vertical-align:middle;">
              <span style="font-size:10px;font-weight:700;color:#C67C4E;font-family:Arial,sans-serif;letter-spacing:0.02em;">P&#8209;R</span>
            </td>
            <td style="padding-left:14px;vertical-align:middle;">
              <span style="font-size:18px;font-weight:700;color:#ffffff;font-family:Arial,sans-serif;display:block;line-height:1.1;letter-spacing:0.02em;">Prime Rénov</span>
              <span style="font-size:9px;color:rgba(255,255,255,0.4);font-family:Arial,sans-serif;display:block;margin-top:4px;letter-spacing:0.18em;text-transform:uppercase;">Cabinet d'Architecture</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ACCENT BAR -->
    <tr><td style="height:3px;background-color:#C67C4E;font-size:0;line-height:0;">&nbsp;</td></tr>

    <!-- BODY -->
    <tr>
      <td style="background-color:#ffffff;padding:44px 36px;">
        ${content}
      </td>
    </tr>

    <!-- SEPARATOR -->
    <tr><td style="height:1px;background-color:#D8D8D2;font-size:0;line-height:0;">&nbsp;</td></tr>

    <!-- FOOTER -->
    <tr>
      <td style="background-color:#261E1A;padding:22px 36px;">
        <p style="margin:0 0 5px;font-size:11px;color:rgba(255,255,255,0.35);font-family:Arial,sans-serif;line-height:1.5;">
          Prime Rénov — Cabinet d'Architecture &amp; Rénovation<br>
          <a href="mailto:contact@primerenov.fr" style="color:#C67C4E;text-decoration:none;">contact@primerenov.fr</a>
        </p>
        <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.18);font-family:Arial,sans-serif;">
          Cet email a été envoyé automatiquement suite à votre demande sur primerenov.fr
        </p>
      </td>
    </tr>

  </table>

</td></tr>
</table>

</body>
</html>`;
}

function confirmHeader(title: string, sub: string): string {
  return `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
      <tr>
        <td style="width:46px;height:46px;border:1.5px solid #C67C4E;border-radius:50%;text-align:center;vertical-align:middle;padding:0;" align="center">
          <span style="font-size:20px;color:#C67C4E;font-family:Arial,sans-serif;line-height:1;">&#10003;</span>
        </td>
        <td style="padding-left:16px;vertical-align:middle;">
          <span style="font-size:20px;font-weight:300;color:#261E1A;font-family:Arial,sans-serif;line-height:1.2;">${title}</span>
          <span style="font-size:12px;color:#9A9A92;font-family:Arial,sans-serif;display:block;margin-top:4px;">${sub}</span>
        </td>
      </tr>
    </table>`;
}

function infoBox(label: string, content: string): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
      <tr>
        <td style="border:1px solid #D8D8D2;border-left:3px solid #C67C4E;padding:16px 20px;background-color:#FAFAF8;">
          <span style="font-size:9px;font-weight:700;color:#9A9A92;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:0.14em;display:block;margin-bottom:8px;">${label}</span>
          ${content}
        </td>
      </tr>
    </table>`;
}

function ctaButton(label: string, href: string): string {
  return `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
      <tr>
        <td style="background-color:#261E1A;padding:14px 28px;">
          <a href="${href}" style="font-size:11px;font-weight:700;color:#ffffff;text-decoration:none;font-family:Arial,sans-serif;letter-spacing:0.12em;text-transform:uppercase;">${label} &rarr;</a>
        </td>
      </tr>
    </table>`;
}

function row(label: string, value: string): string {
  if (!value || value === '—' || value === '') return '';
  return `
    <tr>
      <td style="padding:8px 12px;font-size:11px;font-weight:700;color:#9A9A92;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:0.1em;width:130px;vertical-align:top;">${label}</td>
      <td style="padding:8px 12px;font-size:13px;color:#261E1A;font-family:Arial,sans-serif;vertical-align:top;">${value}</td>
    </tr>`;
}

// ─── 1. Contact confirmation ───────────────────────────────────────────────

export function contactConfirmHtml(nom: string, msg: string): string {
  const msgExcerpt = msg.length > 200 ? msg.slice(0, 200) + '…' : msg;

  const content = `
    ${confirmHeader('Votre message a bien été <strong style="font-weight:700;">reçu</strong>', 'Nous vous répondrons dans les 24 à 48 heures')}

    <p style="font-size:15px;color:#5A5A52;font-family:Arial,sans-serif;line-height:1.7;margin:0 0 8px;">Bonjour <strong style="color:#261E1A;">${nom}</strong>,</p>
    <p style="font-size:15px;color:#5A5A52;font-family:Arial,sans-serif;line-height:1.7;margin:0 0 20px;">
      Merci pour votre message. Notre équipe l'a bien reçu et prendra contact avec vous dans les meilleurs délais.
    </p>

    ${infoBox('Votre message', `<p style="font-size:14px;color:#5A5A52;font-family:Arial,sans-serif;line-height:1.6;margin:0;font-style:italic;">&laquo;&nbsp;${msgExcerpt}&nbsp;&raquo;</p>`)}

    <p style="font-size:13px;color:#9A9A92;font-family:Arial,sans-serif;line-height:1.6;margin:20px 0 0;">
      Si votre demande est urgente, vous pouvez nous joindre directement à
      <a href="mailto:contact@primerenov.fr" style="color:#C67C4E;text-decoration:none;">contact@primerenov.fr</a>.
    </p>

    ${ctaButton('Voir nos réalisations', SITE_URL + '#projets')}
  `;

  return shell(content);
}

// ─── 2. Devis confirmation ─────────────────────────────────────────────────

type DevisData = {
  nom: string;
  email: string;
  tel?: string;
  type?: string;
  desc?: string;
  surface?: string;
  lieu?: string;
  budget?: string;
  delai?: string;
  msg?: string;
};

export function devisConfirmHtml(d: DevisData): string {
  const hasDetails = d.type || d.surface || d.lieu || d.budget || d.delai;

  const detailsTable = hasDetails ? infoBox('Récapitulatif de votre projet', `
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      ${row('Type', d.type ?? '')}
      ${row('Surface', d.surface ?? '')}
      ${row('Lieu', d.lieu ?? '')}
      ${row('Budget', d.budget ?? '')}
      ${row('Délai', d.delai ?? '')}
    </table>
  `) : '';

  const processStep = (num: string, label: string, done: boolean) => `
    <td align="center" style="width:33%;vertical-align:top;padding:0 6px;">
      <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
        <tr>
          <td align="center" style="width:34px;height:34px;background-color:${done ? '#C67C4E' : '#F0F0EC'};border:1.5px solid ${done ? '#C67C4E' : '#D8D8D2'};text-align:center;vertical-align:middle;">
            <span style="font-size:12px;font-weight:700;color:${done ? '#ffffff' : '#9A9A92'};font-family:Arial,sans-serif;">${done ? '&#10003;' : num}</span>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-top:8px;">
            <span style="font-size:10px;font-weight:700;color:${done ? '#C67C4E' : '#9A9A92'};font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:0.1em;">${label}</span>
          </td>
        </tr>
      </table>
    </td>`;

  const processRow = `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 28px;">
      <tr>
        ${processStep('', 'Reçu', true)}
        <td style="vertical-align:middle;padding-bottom:24px;">
          <table width="100%"><tr><td style="height:1px;background-color:#D8D8D2;font-size:0;">&nbsp;</td></tr></table>
        </td>
        ${processStep('2', 'Étude', false)}
        <td style="vertical-align:middle;padding-bottom:24px;">
          <table width="100%"><tr><td style="height:1px;background-color:#D8D8D2;font-size:0;">&nbsp;</td></tr></table>
        </td>
        ${processStep('3', 'Devis', false)}
      </tr>
    </table>`;

  const content = `
    ${confirmHeader('Demande de devis <strong style="font-weight:700;">transmise</strong>', 'Notre équipe vous contactera sous 48h ouvrées')}

    <p style="font-size:15px;color:#5A5A52;font-family:Arial,sans-serif;line-height:1.7;margin:0 0 8px;">Bonjour <strong style="color:#261E1A;">${d.nom}</strong>,</p>
    <p style="font-size:15px;color:#5A5A52;font-family:Arial,sans-serif;line-height:1.7;margin:0 0 4px;">
      Votre demande de devis a bien été reçue et transmise à notre équipe. Nous l'étudions avec attention et vous ferons parvenir une proposition personnalisée.
    </p>

    ${detailsTable}

    <p style="font-size:11px;font-weight:700;color:#9A9A92;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:0.14em;margin:28px 0 4px;">Suivi de votre demande</p>
    ${processRow}

    <p style="font-size:13px;color:#9A9A92;font-family:Arial,sans-serif;line-height:1.6;margin:0;">
      Une question ? Contactez-nous à
      <a href="mailto:contact@primerenov.fr" style="color:#C67C4E;text-decoration:none;">contact@primerenov.fr</a>
      en mentionnant votre nom.
    </p>

    ${ctaButton('Découvrir nos services', SITE_URL + '#services')}
  `;

  return shell(content);
}

// ─── 3. Booking confirmation ───────────────────────────────────────────────

type BookingData = {
  nom: string;
  dateStr: string;
  timeStr: string;
  duration: number;
  meetType: string;
  meetUrl: string;
  sujet?: string;
};

const PLATFORM_LABEL: Record<string, string> = {
  teams: 'Microsoft Teams',
  meet:  'Google Meet',
  phone: 'Appel téléphonique',
};

export function bookingConfirmHtml(d: BookingData): string {
  const platform = PLATFORM_LABEL[d.meetType] ?? d.meetType;

  const meetButton = d.meetUrl ? `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;">
      <tr>
        <td style="background-color:#C67C4E;padding:13px 24px;">
          <a href="${d.meetUrl}" style="font-size:11px;font-weight:700;color:#ffffff;text-decoration:none;font-family:Arial,sans-serif;letter-spacing:0.1em;text-transform:uppercase;">Rejoindre la réunion &rarr;</a>
        </td>
      </tr>
    </table>` : `
    <p style="font-size:13px;color:#9A9A92;font-family:Arial,sans-serif;margin:12px 0 0;line-height:1.5;">
      Le lien de la réunion vous sera envoyé par email avant le rendez-vous.
    </p>`;

  const sujetBlock = d.sujet ? `
    <p style="font-size:13px;color:#9A9A92;font-family:Arial,sans-serif;margin:20px 0 0;">
      <strong style="color:#5A5A52;">Sujet :</strong> ${d.sujet}
    </p>` : '';

  const content = `
    ${confirmHeader('Rendez-vous <strong style="font-weight:700;">confirmé</strong>', `${d.dateStr} à ${d.timeStr}`)}

    <p style="font-size:15px;color:#5A5A52;font-family:Arial,sans-serif;line-height:1.7;margin:0 0 24px;">Bonjour <strong style="color:#261E1A;">${d.nom}</strong>,<br>votre rendez-vous avec Prime Rénov est confirmé. Retrouvez tous les détails ci-dessous.</p>

    <!-- Date/time highlight box -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
      <tr>
        <td style="background-color:#261E1A;padding:28px 24px;text-align:center;">
          <span style="font-size:11px;font-weight:700;color:#C67C4E;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:0.18em;display:block;margin-bottom:10px;">Votre rendez-vous</span>
          <span style="font-size:22px;font-weight:700;color:#ffffff;font-family:Arial,sans-serif;display:block;margin-bottom:6px;">${d.dateStr}</span>
          <span style="font-size:16px;color:rgba(255,255,255,0.65);font-family:Arial,sans-serif;display:block;">${d.timeStr} &nbsp;·&nbsp; ${d.duration} min &nbsp;·&nbsp; ${platform}</span>
        </td>
      </tr>
    </table>

    ${meetButton}
    ${sujetBlock}

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;border-top:1px solid #D8D8D2;">
      <tr>
        <td style="padding-top:20px;">
          <p style="font-size:13px;color:#9A9A92;font-family:Arial,sans-serif;line-height:1.6;margin:0;">
            En cas d'empêchement, merci de nous prévenir en répondant à cet email ou en nous écrivant à
            <a href="mailto:contact@primerenov.fr" style="color:#C67C4E;text-decoration:none;">contact@primerenov.fr</a>.
          </p>
        </td>
      </tr>
    </table>

    ${ctaButton('Voir nos réalisations', SITE_URL + '#projets')}
  `;

  return shell(content);
}
