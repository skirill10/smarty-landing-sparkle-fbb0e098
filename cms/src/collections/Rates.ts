import type { CollectionConfig } from "payload";
import { triggerRebuild } from "../hooks/triggerRebuild";

const currencyOptions = [
  "EUR",
  "USD",
  "GBP",
  "CHF",
  "PLN",
  "SEK",
  "NOK",
  "DKK",
  "CZK",
  "CAD",
  "AUD",
  "NZD",
  "AED",
  "INR",
].map((code) => ({ label: code, value: code }));

/** Per-destination pricing: one row per country + destination type (or carrier group). */
export const Rates: CollectionConfig = {
  slug: "rates",
  admin: {
    useAsTitle: "destinationLabel",
    defaultColumns: ["countryId", "destinationType", "price", "currency", "active"],
    group: "Rates",
  },
  defaultSort: "countryId",
  access: { read: () => true },
  hooks: { afterChange: [triggerRebuild] },
  fields: [
    {
      name: "countryId",
      label: "Country slug",
      type: "text",
      required: true,
      index: true,
      admin: { description: 'Must match a country slug exactly, e.g. "germany".' },
    },
    {
      name: "destinationType",
      type: "select",
      required: true,
      options: [
        { label: "Landline", value: "landline" },
        { label: "Mobile", value: "mobile" },
        { label: "SMS", value: "sms" },
      ],
    },
    { name: "destinationLabel", type: "text" },
    { name: "prefix", type: "text" },
    { name: "price", type: "number", required: true, admin: { step: 0.001 } },
    {
      name: "currency",
      type: "select",
      required: true,
      defaultValue: "EUR",
      options: currencyOptions,
    },
    {
      name: "unit",
      type: "select",
      required: true,
      defaultValue: "minute",
      options: [
        { label: "Per minute", value: "minute" },
        { label: "Per message", value: "message" },
      ],
    },
    { name: "billingIntervalSeconds", type: "number", defaultValue: 60 },
    { name: "connectionFee", type: "number", admin: { step: 0.001 } },
    { name: "minimumCharge", type: "number", admin: { step: 0.001 } },
    { name: "validFrom", type: "date" },
    { name: "validUntil", type: "date" },
    { name: "active", type: "checkbox", defaultValue: true, admin: { position: "sidebar" } },
  ],
};
