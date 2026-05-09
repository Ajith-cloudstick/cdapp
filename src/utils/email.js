const DISPOSABLE = new Set(["mailinator.com","guerrillamail.com","tempmail.com","throwaway.email","sharklasers.com","guerrillamail.info","spam4.me","trashmail.com","dispostable.com","yopmail.com","maildrop.cc","temp-mail.org","fakeinbox.com","10minutemail.com","mailnull.com","spamgourmet.com","spam.la","discard.email","discardmail.com","getnada.com","mailnesia.com","trashmail.at","trashmail.io","getairmail.com","filzmail.com","moakt.com","mytemp.email","tempr.email","gufum.com","mailtemp.info","temporaryemail.net"]);
const TYPOS = {"gamil.com":"gmail.com","gmai.com":"gmail.com","gmial.com":"gmail.com","gnail.com":"gmail.com","gmail.co":"gmail.com","gmail.con":"gmail.com","yaho.com":"yahoo.com","yahooo.com":"yahoo.com","yahoo.co":"yahoo.com","yahoo.con":"yahoo.com","hotmial.com":"hotmail.com","hotmai.com":"hotmail.com","hotmail.co":"hotmail.com","hotmail.con":"hotmail.com","outlok.com":"outlook.com","outlook.co":"outlook.com","iclould.com":"icloud.com","icloud.co":"icloud.com"};

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
  const ld = domain.toLowerCase();
  if (DISPOSABLE.has(ld)) return { ok: false, msg: "Please use your real email — no temp addresses." };
  const fix = TYPOS[ld];
  if (fix) return { ok: false, msg: `Did you mean ${local}@${fix}?`, fix: `${local}@${fix}` };
  return { ok: true };
}
