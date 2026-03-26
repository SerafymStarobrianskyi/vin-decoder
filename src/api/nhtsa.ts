import type { DecodeVINResponse, VehicleVariablesResponse } from "../types/api";

const BASE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles";

async function fetchJSON<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function decodeVIN(vin: string): Promise<DecodeVINResponse> {
  return fetchJSON<DecodeVINResponse>(
    `/decodevin/${encodeURIComponent(vin)}?format=json`,
  );
}

export async function getVehicalesList(): Promise<VehicleVariablesResponse> {
  return fetchJSON<VehicleVariablesResponse>(`/getvehiclevariablelist?format=json`)
}
