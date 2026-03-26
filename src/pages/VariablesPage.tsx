import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import type { VehicleVariable } from "../types/api";
import { Link } from "react-router-dom";
import { getVehicalesList } from "../api/nhtsa";

export default function VariablesPage() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [variables, setVariables] = useState<VehicleVariable[]>([]);

  useEffect(() => {
    let active = true;

    getVehicalesList()
      .then((data) => {
        if (!active) return;
        setVariables(data.Results || []);
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

  function stripHTML (html: string){
    return html.replace(/<[^>]*>/g, "");
  }

  return (
    <Layout>
      <section className="panel">
        <h2>All NHTSA variables</h2>
        {isLoading && <p className="status">Loading...</p>}
        {error && <p className="status error">{error}</p>}
        {!isLoading && !error && (
          <ul className="list">
            {variables.map((variable) => (
              <li key={variable.ID}>
                <Link to={`/variables/${variable.ID}`} className="list__link">
                  {variable.ID}: {variable.Name}
                </Link>
                <p className="description">{variable.Description ? stripHTML(variable.Description): "There is no description"}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Layout>
  );
}
