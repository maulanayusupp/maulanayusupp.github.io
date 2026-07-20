// Career start — years of experience are derived from this, never hardcoded.
export const CAREER_START_YEAR = 2016

/** Whole years of experience as of today (computed at build + on the client). */
export function yearsOfExperience(): number {
  return new Date().getFullYear() - CAREER_START_YEAR
}
