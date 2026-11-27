// Public acquisition remains invitation-only until the product owner opens signup.
export const BETA_URL = "/early-access/";
export const LOGIN_URL = "https://app.smarty.tel/smarty/login";
export const SUPPORT_URL = "https://support.smarty.tel";

export function publicDestination(path: string): string {
  if (/^(?:https?:|mailto:|tel:|#)/i.test(path)) return path;
  const boundary = path.search(/[?#]/);
  const pathname = boundary < 0 ? path : path.slice(0, boundary);
  const suffix = boundary < 0 ? "" : path.slice(boundary);
  const normalized = pathname
    .replace(/^\/(?:en|es|nl|fr|de|sv|pl|el|uk|ja|zh|tr|ar)(?=\/)/, "")
    .replace(/\/$/, "");
  if (["/resources", "/tutorials", "/academy"].includes(normalized)) return SUPPORT_URL;
  if (normalized === "/whats-new") return "https://doc.smarty.tel/s/kb/doc/whats-new-1ZVswVJlAj";
  if (["/signup", "/sign-up", "/register", "/early-access"].includes(normalized))
    return BETA_URL + suffix;
  if (normalized === "/login") return LOGIN_URL;
  return path;
}
