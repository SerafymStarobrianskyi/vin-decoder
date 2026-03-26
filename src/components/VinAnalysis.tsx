import InfoRow from "./InfoRow";

interface Props {
  vin: string;
  yearIdentifier: string;
  serialNumber: string;
  checksum: string;
  correctedVin: string;
}

export default function VinAnalysis({
  vin,
  yearIdentifier,
  serialNumber,
  checksum,
  correctedVin,
}: Props) {
  return (
    <div className="panel">
      <h2>VIN number analysis</h2>
      <div className="details">
        <InfoRow label="Entereed VIN" value={vin || "-"} />
        <InfoRow label="Corrected VIN" value={correctedVin || "-"} />
        <InfoRow label="Year indentifier" value={yearIdentifier} />
        <InfoRow label="Serial number" value={serialNumber} />
        <InfoRow label="CheckSum" value={checksum} />
      </div>
    </div>
  );
}
