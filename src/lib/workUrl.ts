/**
 * The URL scheme for an open case study, in one place so the markup and the
 * router in App.tsx cannot drift apart.
 */
export const WORK_HASH = '#work/';

export const workHref = (projectId: string): string => `${WORK_HASH}${projectId}`;

export const projectIdFromHash = (hash: string): string | null =>
  hash.startsWith(WORK_HASH) ? hash.slice(WORK_HASH.length) : null;
