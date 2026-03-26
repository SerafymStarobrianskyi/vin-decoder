interface VinFormPtops {
  onSubmit: (e?: React.FormEvent, vin?: string) => void;
  vin: string;
  error: string;
  isLoading: boolean;
  setVin: React.Dispatch<React.SetStateAction<string>>;
  history: string[];
  apiMessage: string;
}

export default function VinForm({
  onSubmit,
  vin,
  error,
  isLoading,
  setVin,
  history,
  apiMessage,
}: VinFormPtops) {
  return (
    <section className="panel form__panel">
      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="vin" className="form__label">
          VIN Code
        </label>
        <input
          id="vin"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          placeholder="Example: 1FTFW1CT5DFC10312"
          maxLength={17}
          className="form__input"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Decode"}
        </button>
      </form>

      {error && <p className="status error">{error}</p>}
      {apiMessage && <p className="status info">API Message: {apiMessage}</p>}

      <div className="history">
        <p className="eyebrow">Recent requests</p>
        {history.length === 0 ? (
          <p className="status">There is no story.</p>
        ) : (
          <ul className="history__list">
            {history.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  className="history__btn"
                  onClick={() => onSubmit(undefined, item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
