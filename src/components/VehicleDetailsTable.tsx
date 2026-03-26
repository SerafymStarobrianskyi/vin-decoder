import type { DecodeVINItem } from "../types/api";

interface Props {
  items: DecodeVINItem[];
}

export default function VehicleDetailsTable({items}:Props) {
  const filtered = items.filter((item)=>{
    const value = String(item.Value ?? '').trim();

    return(
      value !== "" &&
      value.toLowerCase() !== "null" &&
      value.toLowerCase() !== "undefined" &&
      value.toLowerCase() !== "not applicable"
    )
  })

  const hasResults = filtered.length > 0;
  return (
    <section className="panel">
      <h2>Decoded variables</h2>
      {!hasResults ? (
        <p className="status">
          After the query, Variable / Value pairs will appear here.
        </p>
      ) : (
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Variable</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={`${item.VariableId}-${item.Variable}`}>
                  <td>{item.Variable}</td>
                  <td>{item.Value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
