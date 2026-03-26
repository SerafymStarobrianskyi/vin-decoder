import Layout from "../components/Layout";
import VinForm from "../components/VinForm";
import useVinDecoder from "../hooks/UseVinDecoder";
import useVehicleSummary from "../hooks/useVehicleSummary";
import ManufacturCard from "../components/ManufacturCard";
import VinAnalysis from "../components/VinAnalysis";
import VehicleDetails from "../components/VehicleDetails";
import VehicleDetailsTable from "../components/VehicleDetailsTable";

export default function HomePage() {
  const { vin, setVin, error, isLoading, items, submitVin, history, apiMessage } = useVinDecoder();
  const {
    brand,
    model,
    bodyType,
    fuel,
    doors,
    year,
    makerName,
    makerAddress,
    makerRegion,
    makerCountry,
    yearIdentifier,
    serialNumber,
    checksum,
    capacityCc,
    hp,
    kw,
    cylinders,
    drive,
    transmission,
    correctedVin,
  } = useVehicleSummary(items, vin);

  return (
    <Layout>
      <section className="dashboard">
        <aside className="leftCol">
          <div className="panel logo__panel">
            <p className="eyebrow">VIN DECODER</p>
            <div className="logo__box">{brand === "-" ? "VIN" : brand}</div>
            <p>Decode vehicle history</p>
          </div>

          <VinForm
            onSubmit={submitVin}
            vin={vin}
            error={error}
            isLoading={isLoading}
            setVin={setVin}
            history={history}
            apiMessage={apiMessage}
          />
          <ManufacturCard
            makerName={makerName}
            makerAddress={makerAddress}
            makerRegion={makerRegion}
            makerCountry={makerCountry}
          />
        </aside>
        <div className="rightCol">
          <VinAnalysis
            vin={vin}
            yearIdentifier={yearIdentifier}
            serialNumber={serialNumber}
            checksum={checksum}
            correctedVin={correctedVin}
          />
          <VehicleDetails
            brand={brand}
            model={model}
            year={year}
            bodyType={bodyType}
            fuel={fuel}
            doors={doors}
            capacityCc={capacityCc}
            hp={hp}
            kw={kw}
            cylinders={cylinders}
            drive={drive}
            transmission={transmission}
          />
          <VehicleDetailsTable items={items}/>
        </div>
      </section>
    </Layout>
  );
}
