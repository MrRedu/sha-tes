// List of public routes that do not require authentication.
// Add path prefixes (like '/auth') to allow their subpaths.
export const PUBLIC_PATHS = ['/', '/login', '/auth'];

export function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));
}
