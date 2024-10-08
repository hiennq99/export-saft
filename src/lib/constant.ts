export enum ExportSaftType {
  ALL = 'all',
  GUIDES = 'guides',
}

export enum ExportSaftPeriod {
  YEAR = 'year',
  MONTH = 'month',
  WEEK = 'week',
  DAY = 'day',
}

export const EXPORT_SAFT_TYPE_OPTIONS = [
  {
    label: 'Invoicing and Estimates',
    value: ExportSaftType.ALL,
  },
  {
    label: 'Shipping, Transport and Return Guides',
    value: ExportSaftType.GUIDES,
  },
];

export const EXPORT_SAFT_VERSION = {
  [ExportSaftType.ALL]:
    'SAF-T PT current version: portaria nº 302/2016 (version 1.04_01).',
  [ExportSaftType.GUIDES]:
    'SAF-T PT current version: portaria nº 160/2013 (version 1.02_01).',
};

export const EXPORT_SAFT_PERIOD_ANNUAL = {
  label: 'Annual',
  value: ExportSaftPeriod.YEAR,
};

export const EXPORT_SAFT_PERIOD_MONTHLY = {
  label: 'Monthly',
  value: ExportSaftPeriod.MONTH,
};

export const EXPORT_SAFT_PERIOD_WEEKLY = {
  label: 'Weekly',
  value: ExportSaftPeriod.WEEK,
};

export const EXPORT_SAFT_PERIOD_DAILY = {
  label: 'Daily',
  value: ExportSaftPeriod.DAY,
};

export const EXPORT_SAFT_PERIOD_OPTIONS = [
  EXPORT_SAFT_PERIOD_ANNUAL,
  EXPORT_SAFT_PERIOD_MONTHLY,
  EXPORT_SAFT_PERIOD_WEEKLY,
  EXPORT_SAFT_PERIOD_DAILY,
];

export const MONTH_OPTIONS = [
  {
    label: 'January',
    value: '1',
  },
  {
    label: 'February',
    value: '2',
  },
  {
    label: 'March',
    value: '3',
  },
  {
    label: 'April',
    value: '4',
  },
  {
    label: 'May',
    value: '5',
  },
  {
    label: 'June',
    value: '6',
  },
  {
    label: 'July',
    value: '7',
  },
  {
    label: 'August',
    value: '8',
  },
  {
    label: 'September',
    value: '9',
  },
  {
    label: 'October',
    value: '10',
  },
  {
    label: 'November',
    value: '11',
  },
  {
    label: 'December',
    value: '12',
  },
];
