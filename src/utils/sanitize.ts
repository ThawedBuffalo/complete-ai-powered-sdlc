const HTML_TAG_PATTERN = /<[^>]*>/g;

/** Trims whitespace and strips HTML tags from user-provided text. */
export function sanitizeText(raw: string): string {
  return raw.trim().replace(HTML_TAG_PATTERN, "");
}

export const MAX_TITLE_LENGTH = 100;
export const MAX_DESCRIPTION_LENGTH = 500;
