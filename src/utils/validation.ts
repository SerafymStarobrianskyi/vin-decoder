export function validateVIN(vin: string): string {
  const value = vin.trim().toUpperCase();

  if (!value) return "Enten VIN-code";
  if (value.length > 17)
    return "The VIN cannot contain more than 17 characters.";
  if (!/^[A-HJ-NPR-Z0-9]{1,17}$/.test(value))
    return "VIN can only contain Latin letters (without I, O, Q) and numbers.";

  return "";
}
