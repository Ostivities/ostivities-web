import {
  OstivitiesBillingAttribute,
  OstivitiesSettingsAttribute,
} from "../types";
import { ColumnDefinitionType } from "../types/components";

export const settingsTableHeaders: ColumnDefinitionType<
  OstivitiesSettingsAttribute,
  keyof OstivitiesSettingsAttribute
>[] = [
  { label: "Staff Name", key: "staffName", hasSorting: true },
  {
    label: "Designation",
    key: "designation",
    hasSorting: true,
    hasFilter: true,
  },
  {
    label: "Date Assigned",
    key: "dateAssigned",
    hasSorting: true,
    hasFilter: true,
  },
];

export const billingTableHeaders: ColumnDefinitionType<
  OstivitiesBillingAttribute,
  keyof OstivitiesBillingAttribute
>[] = [
  { label: "Invoice Date", key: "invoiceDate", hasSorting: true },
  {
    label: "Invoice ID",
    key: "invoiceId",
    hasSorting: true,
  },
  {
    label: "Amount",
    key: "invoiceAmount",
    hasSorting: true,
  },
];
