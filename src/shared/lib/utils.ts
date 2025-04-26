import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFilmLength(length: number) {
  const hours = Math.floor(length / 60)
  const minutes = length % 60
  return `${hours}ч ${minutes}м`
}
