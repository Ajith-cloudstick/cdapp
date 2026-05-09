export const COUNTRIES = [
  { code: "IN", dial: "91",  flag: "🇮🇳", name: "India" },
  { code: "US", dial: "1",   flag: "🇺🇸", name: "United States" },
  { code: "GB", dial: "44",  flag: "🇬🇧", name: "United Kingdom" },
  { code: "AE", dial: "971", flag: "🇦🇪", name: "UAE" },
  { code: "SG", dial: "65",  flag: "🇸🇬", name: "Singapore" },
  { code: "AU", dial: "61",  flag: "🇦🇺", name: "Australia" },
  { code: "CA", dial: "1",   flag: "🇨🇦", name: "Canada" },
  { code: "DE", dial: "49",  flag: "🇩🇪", name: "Germany" },
  { code: "FR", dial: "33",  flag: "🇫🇷", name: "France" },
  { code: "JP", dial: "81",  flag: "🇯🇵", name: "Japan" },
  { code: "NZ", dial: "64",  flag: "🇳🇿", name: "New Zealand" },
  { code: "ZA", dial: "27",  flag: "🇿🇦", name: "South Africa" },
];

export function cleanPhone(raw) {
  return raw.replace(/\D/g, "").slice(0, 15);
}

export function validatePhone(dialCode, number) {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 7)  return "Enter a valid phone number.";
  if (digits.length > 15) return "Number is too long.";
  return null;
}
