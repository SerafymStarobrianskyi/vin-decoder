import type { DecodeVINItem } from "../types/api";

export function normalize(value: string): string {
  return value.trim().toUpperCase();
}

export function buildLookup(items: DecodeVINItem[]): Map<string, string> {
  const map = new Map<string, string>();

  for (const item of items) {
    const key = normalize(item.Variable);
    const value = (item.Value || "").trim();

    if (!map.has(key) && value) {
      map.set(key, value);
    }
  }
  return map;
}

export function pick(lookup: Map<string, string>, keys: string[], fallback = "-"):string{
  for(const key of keys){
    const value = lookup.get(normalize(key))
    if(value) return value;
  }
  return fallback;
}