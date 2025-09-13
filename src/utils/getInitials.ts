export function getInitials(name?: string | null): string {
  if (!name) return "";

  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  const first = parts[0]?.charAt(0).toUpperCase() ?? "";
  const last = parts[parts.length - 1]?.charAt(0).toUpperCase() ?? "";
  return first + last;
}
