"use client";

import { useRouter } from "next/navigation";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { EVENT_TYPE_LABELS } from "@/lib/eventTypes";

type EventType = keyof typeof EVENT_TYPE_LABELS;

export function EventFilters({
  years,
  selectedYear,
  selectedType,
}: {
  years: number[];
  selectedYear: number;
  selectedType: EventType;
}) {
  const router = useRouter();

  function navigate(next: { year?: number; type?: EventType }) {
    const year = next.year ?? selectedYear;
    const type = next.type ?? selectedType;
    router.push(`/events?year=${year}&type=${type}`);
  }

  return (
    <Stack direction="row" spacing={2}>
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel id="event-type-filter-label">Tipo</InputLabel>
        <Select
          labelId="event-type-filter-label"
          label="Tipo"
          value={selectedType}
          onChange={(event: SelectChangeEvent) =>
            navigate({ type: event.target.value as EventType })
          }
        >
          {Object.entries(EVENT_TYPE_LABELS).map(([value, label]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="event-year-filter-label">Ano</InputLabel>
        <Select
          labelId="event-year-filter-label"
          label="Ano"
          value={selectedYear}
          onChange={(event: SelectChangeEvent<number>) =>
            navigate({ year: Number(event.target.value) })
          }
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
