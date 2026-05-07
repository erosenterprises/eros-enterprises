const SCRIPT_TAG_PATTERN = /<\s*\/?\s*script\b[^>]*>/gi;
const ANGLE_BRACKET_PATTERN = /[<>]/g;

export function sanitizeTextInput(value: string) {
  return value
    .replace(SCRIPT_TAG_PATTERN, "")
    .replace(ANGLE_BRACKET_PATTERN, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeMultilineTextInput(value: string) {
  return value
    .replace(SCRIPT_TAG_PATTERN, "")
    .replace(ANGLE_BRACKET_PATTERN, "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function sanitizePhoneInput(value: string) {
  return value.replace(/[^\d+\-() ]/g, "").replace(/\s+/g, " ").trim();
}
