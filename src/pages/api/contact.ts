import type { APIRoute } from 'astro';

export const prerender = false;

interface ResponseBody {
  ok: boolean;
  error?: string;
}

const json = (body: ResponseBody, status: number): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

const EMAIL_RE = /^\S+@\S+\.\S+$/;

// Cloudflare Workers expose runtime secrets via `locals.runtime.env`, not
// `import.meta.env`. Read from the runtime first, fall back to build-time
// (dev mode / PUBLIC_* keys) so the same code path works on `astro dev`.
function readEnv(locals: App.Locals, key: string): string | undefined {
  const runtimeEnv = (locals as { runtime?: { env?: Record<string, string | undefined> } }).runtime?.env;
  return runtimeEnv?.[key] ?? (import.meta.env as Record<string, string | undefined>)[key];
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const formData = await request.formData();
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const organization = String(formData.get('organization') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const honeypot = String(formData.get('website') ?? '').trim();
    const turnstileToken = String(formData.get('cf-turnstile-response') ?? '');

    // Silent honeypot rejection — return OK so the bot thinks it worked.
    if (honeypot) {
      return json({ ok: true }, 200);
    }

    // Manual validation
    if (!name || name.length < 2) {
      return json({ ok: false, error: 'Please add your name.' }, 400);
    }
    if (!EMAIL_RE.test(email)) {
      return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
    }
    if (!message || message.length < 10) {
      return json({ ok: false, error: 'Please add a little context (at least 10 characters).' }, 400);
    }

    // Turnstile verification — only runs if server-side key is configured.
    const turnstileSecret = readEnv(locals, 'TURNSTILE_SECRET_KEY');
    if (turnstileSecret) {
      if (!turnstileToken) {
        return json({ ok: false, error: 'Verification token missing. Reload and try again.' }, 400);
      }
      const verifyResp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
      });
      const verifyData = (await verifyResp.json()) as { success?: boolean };
      if (!verifyData.success) {
        return json({ ok: false, error: 'Verification failed. Try again.' }, 400);
      }
    }

    // Resend send
    const resendKey = readEnv(locals, 'RESEND_API_KEY');
    if (!resendKey) {
      console.warn('[contact] RESEND_API_KEY is not set — form submission is not being emailed.');
      return json(
        { ok: false, error: 'The contact form is not fully configured yet. Please email us directly.' },
        503,
      );
    }

    const to = readEnv(locals, 'CONTACT_TO_EMAIL') ?? 'ahmetkarabasdtengineer@gmail.com';
    const from = readEnv(locals, 'CONTACT_FROM_EMAIL') ?? 'onboarding@resend.dev';
    const subjectOrg = organization ? ` (${organization})` : '';
    const textBody = [
      `From: ${name} <${email}>`,
      organization ? `Organization: ${organization}` : '',
      '',
      message,
    ]
      .filter(Boolean)
      .join('\n');

    const resendResp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `databerganalytics <${from}>`,
        to,
        reply_to: email,
        subject: `New enquiry — ${name}${subjectOrg}`,
        text: textBody,
      }),
    });

    if (!resendResp.ok) {
      const errText = await resendResp.text();
      console.error('[contact] Resend error:', resendResp.status, errText);
      return json(
        { ok: false, error: 'Something went wrong sending. Try again or email us directly.' },
        502,
      );
    }

    return json({ ok: true }, 200);
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return json({ ok: false, error: 'Unexpected error. Try again or email us directly.' }, 500);
  }
};
