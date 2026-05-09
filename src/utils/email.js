const DISPOSABLE = new Set(["mailinator.com","guerrillamail.com","tempmail.com","throwaway.email","sharklasers.com","guerrillamail.info","spam4.me","trashmail.com","dispostable.com","yopmail.com","maildrop.cc","temp-mail.org","fakeinbox.com","10minutemail.com","mailnull.com","spamgourmet.com","spam.la","discard.email","discardmail.com","getnada.com","mailnesia.com","trashmail.at","trashmail.io","getairmail.com","filzmail.com","moakt.com","mytemp.email","tempr.email","gufum.com","mailtemp.info","temporaryemail.net"]);
const TYPOS = {
  // gmail.com
  "gamil.com":"gmail.com","gmai.com":"gmail.com","gmial.com":"gmail.com","gnail.com":"gmail.com",
  "gmail.co":"gmail.com","gmail.con":"gmail.com","gmail.cm":"gmail.com","gmail.om":"gmail.com",
  "gmaill.com":"gmail.com","ggmail.com":"gmail.com","gmaiil.com":"gmail.com","gmail.comm":"gmail.com",
  "gmial.co":"gmail.com","gmal.com":"gmail.com","gmaik.com":"gmail.com","gmali.com":"gmail.com",
  "gmeil.com":"gmail.com","gmaile.com":"gmail.com","gmailcom":"gmail.com","gmail.c":"gmail.com",
  "gmail.net":"gmail.com","gmail.org":"gmail.com","g-mail.com":"gmail.com","gmal.co":"gmail.com",
  // yahoo.com
  "yaho.com":"yahoo.com","yahooo.com":"yahoo.com","yahoo.co":"yahoo.com","yahoo.con":"yahoo.com",
  "yhoo.com":"yahoo.com","yahoo.cm":"yahoo.com","yahoo.om":"yahoo.com","yahoocom":"yahoo.com",
  // hotmail.com
  "hotmial.com":"hotmail.com","hotmai.com":"hotmail.com","hotmail.co":"hotmail.com","hotmail.con":"hotmail.com",
  "hotmaill.com":"hotmail.com","hotmail.cm":"hotmail.com","hotmal.com":"hotmail.com","hotnail.com":"hotmail.com",
  // outlook.com
  "outlok.com":"outlook.com","outlook.co":"outlook.com","outlok.co":"outlook.com","outloook.com":"outlook.com",
  "outlook.con":"outlook.com","outlook.cm":"outlook.com","outloo.com":"outlook.com",
  // icloud.com
  "iclould.com":"icloud.com","icloud.co":"icloud.com","iclud.com":"icloud.com","icloud.con":"icloud.com",
  "icloud.cm":"icloud.com","iclooud.com":"icloud.com","icoud.com":"icloud.com",
  // deloitte.com
};

// RFC 5321-compatible: allows all standard local-part chars, valid domain labels
const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

export function validateEmail(email) {
  const v = email.trim();
  if (!v) return { ok: false, msg: "Please enter your email address." };
  if (!v.includes("@")) return { ok: false, msg: "Missing @ in your email." };
  if (v.split("@").length > 2) return { ok: false, msg: "Email can only have one @." };
  const [local, domain] = v.split("@");
  if (!local || !domain) return { ok: false, msg: "Incomplete email address." };
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) return { ok: false, msg: "Invalid email format." };
  if (!domain.includes(".")) return { ok: false, msg: "Email domain looks incomplete." };
  const tld = domain.split(".").pop();
  if (tld.length < 2) return { ok: false, msg: "Invalid email domain." };
  if (!EMAIL_RE.test(v)) return { ok: false, msg: "Enter a valid email address." };
  const ld = domain.toLowerCase();
  if (DISPOSABLE.has(ld)) return { ok: false, msg: "Please use your real email — no temp addresses." };
  const fix = TYPOS[ld];
  if (fix) return { ok: false, msg: `Did you mean ${local}@${fix}?`, fix: `${local}@${fix}` };
  return { ok: true };
}
