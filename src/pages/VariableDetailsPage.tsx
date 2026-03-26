import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useMemo, useState } from "react";
import type { VehicleVariable } from "../types/api";
import { getCachedVehicleVariables } from "../utils/vehicleVariables";

function stripHTML(html: string) {
  return html.replace(/<[^>]*>/g, "");
}

export default function VariableDetailsPage() {
  const { variableId } = useParams();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [variables, setVariables] = useState<VehicleVariable[]>([]);

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

  const variable = useMemo(
    () => variables.find((item) => String(item.ID) === String(variableId)),
    [variableId, variables],
  );

  return (
    <Layout>
      <section className="panel">
        <h2>Variable #{variableId}</h2>
        {isLoading && <p className="status">Loading...</p>}
        {error && <p className="status error">{error}</p>}

        {!isLoading && !error && !variable && (
          <p className="status">Variable not found.</p>
        )}

        {variable && (
          <div className="variable">
            <h3>{variable.Name}</h3>
            <p>
              {variable.Description
                ? stripHTML(variable.Description)
                : "There is no description available."}
            </p>
            <p>Data type: {variable.DataType || "N/A"}</p>
            <p>Group name: {variable.GroupName || "N/A"}</p>
          </div>
        )}

        <Link to="/variables" className="backlink">
          Return to list
        </Link>
      </section>
    </Layout>
  );
}
