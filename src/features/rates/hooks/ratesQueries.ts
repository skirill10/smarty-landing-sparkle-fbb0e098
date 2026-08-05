import { queryOptions } from "@tanstack/react-query";
import { ratesRepository } from "../api";
import type { CountryQueryParams, RatesQueryParams } from "../types";

/**
 * Query definitions shared by loaders and components. Keys include every
 * parameter that affects the result so caching stays correct.
 */
export const ratesQueries = {
  content: () =>
    queryOptions({
      queryKey: ["rates", "content"],
      queryFn: () => ratesRepository.getRatesPageContent(),
      staleTime: 5 * 60_000,
    }),

  list: (params: RatesQueryParams) =>
    queryOptions({
      queryKey: ["rates", "list", params],
      queryFn: () => ratesRepository.getRates(params),
      staleTime: 60_000,
    }),

  countries: (params: CountryQueryParams = {}) =>
    queryOptions({
      queryKey: ["rates", "countries", params],
      queryFn: () => ratesRepository.getCountries(params),
      staleTime: 5 * 60_000,
    }),

  country: (slug: string) =>
    queryOptions({
      queryKey: ["rates", "country", slug],
      queryFn: () => ratesRepository.getCountryBySlug(slug),
      staleTime: 5 * 60_000,
    }),

  countryRates: (countryId: string) =>
    queryOptions({
      queryKey: ["rates", "country-rates", countryId],
      queryFn: () => ratesRepository.getRatesByCountry(countryId),
      staleTime: 60_000,
    }),

  faqs: (countryId?: string) =>
    queryOptions({
      queryKey: ["rates", "faqs", countryId ?? "general"],
      queryFn: () => ratesRepository.getFAQs(countryId),
      staleTime: 5 * 60_000,
    }),
};
