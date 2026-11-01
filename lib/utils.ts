import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatRelativeDate(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return formatDate(date);
}

export const DEPARTMENT_COLORS: Record<string, string> = {
  android: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  ios: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  design: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  "web-ai": "text-violet-400 bg-violet-400/10 border-violet-400/20",
  "game-dev": "text-pink-400 bg-pink-400/10 border-pink-400/20",
};

export const DEPARTMENT_LABELS: Record<string, string> = {
  android: "Android",
  ios: "iOS",
  design: "Design",
  "web-ai": "Web & AI",
  "game-dev": "Game Dev",
};
