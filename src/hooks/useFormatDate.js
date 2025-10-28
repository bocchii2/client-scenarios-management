import React from "react";

/**
 * Formatea fechas usando Intl.DateTimeFormat/RelativeTimeFormat.
 * Soporta presets y opciones avanzadas.
 *
 * Compatibilidad: formatDate(date, "date"|"datetime"|...)
 */
export function formatDate(dateInput, cfg = {}) {
  // Compatibilidad con firma antigua: (date, "format")
  if (typeof cfg === "string") cfg = { format: cfg };

  const {
    locale = "es-ES",
    format = "date", // 'date'|'short'|'medium'|'datetime'|'time'|'weekday'|'relative'|'iso'
    options,
    timeZone,
    now, // para 'relative' (por defecto: new Date())
  } = cfg;

  const date = toDate(dateInput);
  if (!date) return "-";

  if (format === "iso") return date.toISOString();
  if (format === "relative")
    return formatRelative(date, now ?? new Date(), locale);

  const presets = {
    date: { year: "numeric", month: "long", day: "numeric" },
    short: { year: "2-digit", month: "2-digit", day: "2-digit" },
    medium: { year: "numeric", month: "short", day: "2-digit" },
    datetime: {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    },
    time: { hour: "2-digit", minute: "2-digit" },
    weekday: {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  };

  const fmtOptions = {
    ...(presets[format] || presets.date),
    ...(options || {}),
  };
  if (timeZone) fmtOptions.timeZone = timeZone;

  try {
    return new Intl.DateTimeFormat(locale, fmtOptions).format(date);
  } catch {
    return "-";
  }
}

function toDate(input) {
  if (input == null || input === "") return null;
  if (input instanceof Date && !isNaN(input)) return input;
  if (typeof input === "number") {
    const d = new Date(input);
    return isNaN(d) ? null : d;
  }
  if (typeof input === "string") {
    const d = new Date(input);
    return isNaN(d) ? null : d;
  }
  return null;
}

function formatRelative(target, now, locale) {
  const diffMs = target.getTime() - now.getTime();
  const abs = Math.abs(diffMs);

  const sec = 1000;
  const min = 60 * sec;
  const hour = 60 * min;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (abs < min) return rtf.format(Math.round(diffMs / sec), "second");
  if (abs < hour) return rtf.format(Math.round(diffMs / min), "minute");
  if (abs < day) return rtf.format(Math.round(diffMs / hour), "hour");
  if (abs < week) return rtf.format(Math.round(diffMs / day), "day");
  if (abs < month) return rtf.format(Math.round(diffMs / week), "week");
  if (abs < year) return rtf.format(Math.round(diffMs / month), "month");
  return rtf.format(Math.round(diffMs / year), "year");
}

/**
 * Hook para memoizar el formateo de fechas.
 */
export function useFormatDate(dateInput, cfg) {
  const key = React.useMemo(() => JSON.stringify(cfg ?? {}), [cfg]);
  return React.useMemo(() => formatDate(dateInput, cfg), [dateInput, key]);
}

export default formatDate;
