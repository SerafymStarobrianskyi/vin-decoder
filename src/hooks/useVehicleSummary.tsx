import { useMemo } from "react";
import type { DecodeVINItem } from "../types/api";
import { buildLookup, normalize, pick } from "../utils/decodeHelpers";

export default function useVehicleSummary(items: DecodeVINItem[], vin: string) {
  return useMemo(() => {
    const lookup = buildLookup(items);
    const normalized = normalize(vin); 

    return {
      brand: pick(lookup, ["Make"]),
      model: pick(lookup, ["Model"]),
      bodyType: pick(lookup, ["Body Class"]),
      fuel: pick(lookup, ["Fuel Type - Primary", "Fuel Type"]),
      doors: pick(lookup, ["Doors"]),
      year: pick(lookup, ["Model Year"]),
      drive: pick(lookup, ["Drive Type"]),
      transmission: pick(lookup, ["Transmission Style", "Transmission Speeds"]),
      hp: pick(lookup, ["Engine Brake (hp)"]),
      kw: pick(lookup, ["Engine Power (kW)"]),
      capacityCc: pick(lookup, ["Displacement (CC)"]),
      cylinders: pick(lookup, ["Engine Number of Cylinders"]),
      makerName: pick(lookup, ["Manufacturer Name", "Plant Company Name"]),
      makerAddress: pick(lookup, ["Plant City", "Plant State"]),
      makerRegion: pick(lookup, ["Region"]),
      makerCountry: pick(lookup, ["Plant Country", "Destination Market"]),
      correctedVin: pick(lookup, ["Suggested VIN", "Error Code"], normalized || "-"),
      yearIdentifier: normalized.length >= 10 ? normalized[9] : "-",
      serialNumber: normalized.length >= 6 ? normalized.slice(-6) : "-",
      checksum: normalized.length === 17 && /^[A-HJ-NPR-Z0-9]{1,17}$/.test(vin) ? "valid" : "invalid",
    };
  }, [items, vin]);
}
