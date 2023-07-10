import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// sanitizeText
// Removing all html tags from string
export function sanitizeText(text: string) {
  return text.replace(/(<([^>]+)>)/gi, '');
}
