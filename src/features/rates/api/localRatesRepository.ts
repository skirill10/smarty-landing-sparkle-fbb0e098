import { mockCountries, mockFaqs, mockRates, mockRatesPageContent } from "../data/mockRates";
import { createDatasetRepository, type RatesDataset } from "./datasetRepository";
import type { RatesRepository } from "./ratesRepository";

export const localRatesDataset: RatesDataset = {
  countries: mockCountries,
  rates: mockRates,
  faqs: mockFaqs,
  pageContent: mockRatesPageContent,
};

/** Local, offline-first implementation backed by typed mock data. */
export const localRatesRepository: RatesRepository = createDatasetRepository(
  async () => localRatesDataset,
);
