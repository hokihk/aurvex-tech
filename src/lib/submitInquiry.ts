import { ProjectInquiryForm } from '../types';
import { SITE } from '../data/siteConfig';

/**
 * Where project inquiries are delivered.
 *
 * Set VITE_INQUIRY_ENDPOINT in .env.local to any endpoint that accepts a JSON
 * POST (Formspree, Web3Forms, a Cloud Run function, your own API...). If it is
 * not configured, we fall back to opening the visitor's mail client with the
 * brief pre-filled, so a lead is never silently dropped.
 */
const ENDPOINT = (import.meta.env.VITE_INQUIRY_ENDPOINT as string | undefined)?.trim();

export type SubmitResult =
  | { status: 'sent' }
  | { status: 'mailto' }
  | { status: 'error'; message: string };

const buildPlainText = (form: ProjectInquiryForm): string =>
  [
    `Services: ${form.serviceTypes.join(', ')}`,
    `Budget: ${form.budgetRange}`,
    `Timeline: ${form.timeline}`,
    '',
    'Brief:',
    form.description,
    '',
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Company: ${form.company || '—'}`,
    `Phone: ${form.phone || '—'}`,
  ].join('\n');

const openMailFallback = (form: ProjectInquiryForm) => {
  const subject = `Project inquiry — ${form.company || form.name}`;
  const href = `mailto:${SITE.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(buildPlainText(form))}`;
  window.location.href = href;
};

export const submitInquiry = async (form: ProjectInquiryForm): Promise<SubmitResult> => {
  if (!ENDPOINT) {
    openMailFallback(form);
    return { status: 'mailto' };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        submittedAt: new Date().toISOString(),
        source: 'aurvex.tech landing page',
        summary: buildPlainText(form),
      }),
    });

    if (!response.ok) {
      return {
        status: 'error',
        message: `The server rejected the request (${response.status}).`,
      };
    }

    return { status: 'sent' };
  } catch {
    return {
      status: 'error',
      message: 'We could not reach our servers. Please check your connection.',
    };
  }
};

export const mailtoHref = (form: ProjectInquiryForm): string =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(
    `Project inquiry — ${form.company || form.name || 'New project'}`
  )}&body=${encodeURIComponent(buildPlainText(form))}`;
