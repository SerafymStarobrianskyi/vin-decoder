import InfoRow from "./InfoRow";

interface Props {
  makerName: string;
  makerAddress: string;
  makerRegion: string;
  makerCountry: string;
}

export default function ManufacturCard({
  makerName,
  makerAddress,
  makerRegion,
  makerCountry,
}: Props) {
  return (
    <div className="panel">
      <h3>Manufacture</h3>
      <InfoRow label="Name" value={makerName} />
      <InfoRow label="Address" value={makerAddress} />
      <InfoRow label="Region" value={makerRegion} />
      <InfoRow label="Country" value={makerCountry} />
    </div>
  );
}
