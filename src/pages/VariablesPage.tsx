import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import type { VehicleVariable } from "../types/api";
import { Link } from "react-router-dom";
import { getCachedVehicleVariables } from "../utils/vehicleVariables";

function stripHTML(html: string) {
  return html.replace(/<[^>]*>/g, "");
}

export default function VariablesPage() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [variables, setVariables] = useState<VehicleVariable[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    let active = true;

    getCachedVehicleVariables()
      .then((result) => {
        if (!active) return;
        setVariables(result);
      })
      .catch(() => {
        if (!active) return;
        setError("Failed to load variable list.");
      })
      .finally(() => {
        if (!active) return;
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const totalPages = Math.ceil(variables.length/itemsPerPage);

  const currentItems = useMemo(()=>{
    const start = (currentPage-1) * itemsPerPage;
    console.log(start, itemsPerPage)
    return variables.slice(start, start + itemsPerPage);
  }, [variables, currentPage]);

  return (
    <Layout>
      <section className="panel">
        <h2>All NHTSA variables</h2>
        {isLoading && <p className="status">Loading...</p>}
        {error && <p className="status error">{error}</p>}
        {!isLoading && !error && (
          <>
          <ul className="list">
            {currentItems.map((variable) => (
              <li key={variable.ID}>
                <Link to={`/variables/${variable.ID}`} className="list__link">
                  {variable.ID}: {variable.Name}
                </Link>
                <p className="description">
                  {variable.Description
                    ? stripHTML(variable.Description)
                    : "There is no description"}
                </p>
              </li>
            ))}
          </ul>
          {totalPages > 1 && (
            <div className="pagination">
              <button onClick={()=>setCurrentPage((prev) => Math.max(prev-1, 1))} disabled={currentPage === 1}>Prev</button>

              <span>Page {currentPage} of {totalPages}</span>

              <button onClick={()=>setCurrentPage((prev) => Math.min(prev+1, totalPages))} disabled={currentPage === totalPages}>Next</button>
            </div>
          )}
          </>
        )}
      </section>
    </Layout>
  );
}
