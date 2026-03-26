import InfoRow from "./InfoRow";

interface Props {
  brand: string;
  model: string;
  year: string;
  bodyType: string;
  fuel: string;
  doors: string;
  capacityCc: string;
  hp: string;
  kw: string;
  cylinders: string;
  drive: string;
  transmission: string;
}

export default function VehicleDetails({
  brand,
  model,
  year,
  bodyType,
  fuel,
  doors,
  capacityCc,
  hp,
  kw,
  cylinders,
  drive,
  transmission,
}: Props) {
  return (
    <div className="panel">
      <h2>Vehical Details</h2>
      <div className="details twoCols">
        <InfoRow label="Brand" value={brand} />
        <InfoRow label="Model" value={model} />
        <InfoRow label="Year of manufacture" value={year} />
        <InfoRow label="Body type" value={bodyType} />
        <InfoRow label="Fuel" value={fuel} />
        <InfoRow label="Doors" value={doors} />
        <InfoRow
          label="Capacity"
          value={capacityCc === "-" ? "-" : `${capacityCc} cc`}
        />
        <InfoRow
          label="Power"
          value={hp === "-" ? "-" : kw === "-" ? `${hp} HP` : `${kw} KW`}
        />
        <InfoRow label="Cylinders" value={cylinders} />
        <InfoRow label="Drive" value={drive} />
        <InfoRow label="Transmission" value={transmission} />
      </div>
    </div>
  );
}
