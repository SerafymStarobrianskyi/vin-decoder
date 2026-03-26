import {type  FormEvent, useState } from "react";
import type { DecodeVINItem } from "../types/api";
import { validateVIN } from "../utils/validation";
import { decodeVIN } from "../api/nhtsa";
import { normalize } from "../utils/decodeHelpers";
import { getHistory, saveToHistory } from "../utils/storage";

export default function useVinDecoder() {
  const [vin, setVin] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<DecodeVINItem[]>([]);
  const [history, setHistory] = useState<string[]>(getHistory());
  const [apiMessage, setApiMessage] = useState<string>("");

  async function submitVin(event?: FormEvent, externalVin?: string) {
    event?.preventDefault();

    const value = normalize(externalVin || vin);
    const validationError = validateVIN(value);

    setError(validationError || "");
    setApiMessage("");
    if (validationError) return;

    setIsLoading(true);

    try {
      const data = await decodeVIN(value);
      const filteredData = (data.Results || []).filter(
        (row) => row.Value && String(row.Value).trim() !== "",
      );

      setItems(filteredData);
      setVin(value);
      setApiMessage(data.Message|| "")
      setHistory(saveToHistory(value))
    } catch {
      setError("Failed to get API response. Please try again.");
      setItems([]);
      setApiMessage(""); 
    } finally {
      setIsLoading(false);
    }
  }

  return {
    vin,
    setVin,
    error,
    isLoading,
    items,
    submitVin,
    history,
    apiMessage,
  };
}
