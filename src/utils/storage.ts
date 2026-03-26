import { normalize } from "./decodeHelpers";

export function getHistory(): string[] {
  try {
    const parsed = JSON.parse(
      localStorage.getItem("vin-decoder") || "[]",
    ) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item): item is string => typeof item === "string")
      .slice(0, 3);
  } catch {
    return [];
  }
}

export function saveToHistory(vin: string): string[] {
  const normalized = normalize(vin);
  const updated = [
    normalize(vin),
    ...getHistory().filter((item) => item !== normalized),
  ].slice(0, 3);
  localStorage.setItem("vin-decoder", JSON.stringify(updated));
  return updated;
}
