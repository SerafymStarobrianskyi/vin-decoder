import { getVehicalesList } from "../api/nhtsa";
import type { VehicleVariable } from "../types/api";

const CACHE_TTL = 1000 * 60 * 60;

export async function getCachedVehicleVariables(): Promise<VehicleVariable[]> {
  const cached = sessionStorage.getItem("vehicle-variables");
  const cachedTime = sessionStorage.getItem("vehicle-variables-time");

  if (cached && cachedTime) {
    const fresh = Date.now() - Number(cachedTime) < CACHE_TTL;

    if (fresh) {
      try {
        return JSON.parse(cached) as VehicleVariable[];
      } catch {
        sessionStorage.removeItem("vehicle-variables");
      }
    }
  }

  const data = await getVehicalesList();
  const results = data.Results || [];
  sessionStorage.setItem("vehicle-variables", JSON.stringify(results));
  sessionStorage.setItem("vehicle-variables-time", String(Date.now()));

  return results;
}
