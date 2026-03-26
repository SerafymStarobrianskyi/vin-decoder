export default function InfoRow({label, value}: {label: string, value: string}){
  return (
    <div className="infoRow">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}