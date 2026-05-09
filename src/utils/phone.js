export const COUNTRIES = [
  { code: "IN", dial: "91",  flag: "🇮🇳", name: "India",         placeholder: "98765 43210" },
  { code: "US", dial: "1",   flag: "🇺🇸", name: "United States", placeholder: "201 555 0123" },
  { code: "GB", dial: "44",  flag: "🇬🇧", name: "United Kingdom",placeholder: "7700 900123" },
  { code: "AE", dial: "971", flag: "🇦🇪", name: "UAE",           placeholder: "50 123 4567" },
  { code: "SG", dial: "65",  flag: "🇸🇬", name: "Singapore",     placeholder: "9123 4567" },
  { code: "AU", dial: "61",  flag: "🇦🇺", name: "Australia",     placeholder: "412 345 678" },
  { code: "CA", dial: "1",   flag: "🇨🇦", name: "Canada",        placeholder: "506 234 5678" },
  { code: "DE", dial: "49",  flag: "🇩🇪", name: "Germany",       placeholder: "1512 3456789" },
  { code: "FR", dial: "33",  flag: "🇫🇷", name: "France",        placeholder: "6 12 34 56 78" },
  { code: "JP", dial: "81",  flag: "🇯🇵", name: "Japan",         placeholder: "90 1234 5678" },
  { code: "NZ", dial: "64",  flag: "🇳🇿", name: "New Zealand",   placeholder: "21 123 4567" },
  { code: "ZA", dial: "27",  flag: "🇿🇦", name: "South Africa",  placeholder: "71 123 4567" },
];

// Per-country validation: regex applied to digit-only local number
const PHONE_RULES = {
  "91":  { re: /^[6-9]\d{9}$/,     hint: "Enter a 10-digit number starting with 6–9." },
  "1":   { re: /^\d{10}$/,          hint: "Enter a 10-digit number." },
  "44":  { re: /^[1-9]\d{9}$/,      hint: "Enter a 10-digit UK number (without leading 0)." },
  "971": { re: /^[0-9]\d{8}$/,      hint: "Enter a 9-digit UAE number." },
  "65":  { re: /^[689]\d{7}$/,      hint: "Enter an 8-digit Singapore number starting with 6, 8, or 9." },
  "61":  { re: /^[2-9]\d{8}$/,      hint: "Enter a 9-digit Australian number (without leading 0)." },
  "49":  { re: /^[1-9]\d{9,10}$/,   hint: "Enter a 10–11 digit German number." },
  "33":  { re: /^[1-9]\d{8}$/,      hint: "Enter a 9-digit French number." },
  "81":  { re: /^[0-9]\d{9,10}$/,   hint: "Enter a 10–11 digit Japanese number." },
  "64":  { re: /^[2-9]\d{7,8}$/,    hint: "Enter an 8–9 digit New Zealand number." },
  "27":  { re: /^[0-9]\d{8}$/,      hint: "Enter a 9-digit South African number." },
};

export function cleanPhone(raw) {
  return raw.replace(/\D/g, "").slice(0, 15);
}

export function validatePhone(dialCode, number) {
  const digits = number.replace(/\D/g, "");
  if (!digits) return "Please enter your phone number.";
  const rule = PHONE_RULES[dialCode];
  if (rule) {
    if (!rule.re.test(digits)) return rule.hint;
  } else {
    if (digits.length < 7)  return "Enter a valid phone number.";
    if (digits.length > 15) return "Number is too long.";
  }
  return null;
}
