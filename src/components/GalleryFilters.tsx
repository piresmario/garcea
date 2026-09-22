"use client";

import { useRouter } from "next/navigation";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";

type EventOption = { id: string; title: string; year: number };

export function GalleryFilters({
  events,
  years,
  selectedYear,
  selectedEventId,
}: {
  events: EventOption[];
  years: number[];
  selectedYear?: number;
  selectedEventId?: string;
}) {
  const router = useRouter();

  function navigate(next: { year?: number; eventId?: string }) {
    const params = new URLSearchParams();
    if (next.year !== undefined) params.set("year", String(next.year));
    if (next.eventId) params.set("eventId", next.eventId);
    const query = params.toString();
    router.push(query ? `/manage/gallery?${query}` : "/manage/gallery");
  }

  const eventsForYear = selectedYear
    ? events.filter((event) => event.year === selectedYear)
    : events;

  return (
    <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel id="gallery-year-filter-label" shrink>
          Ano
        </InputLabel>
        <Select
          labelId="gallery-year-filter-label"
          label="Ano"
          displayEmpty
          notched
          value={selectedYear !== undefined ? String(selectedYear) : ""}
          onChange={(event: SelectChangeEvent) =>
            navigate({ year: event.target.value ? Number(event.target.value) : undefined })
          }
        >
          <MenuItem value="">Todos</MenuItem>
          {years.map((year) => (
            <MenuItem key={year} value={String(year)}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 220 }}>
        <InputLabel id="gallery-event-filter-label" shrink>
          Evento
        </InputLabel>
        <Select
          labelId="gallery-event-filter-label"
          label="Evento"
          displayEmpty
          notched
          value={selectedEventId ?? ""}
          onChange={(event: SelectChangeEvent) =>
            navigate({ year: selectedYear, eventId: event.target.value || undefined })
          }
        >
          <MenuItem value="">Todos</MenuItem>
          {eventsForYear.map((event) => (
            <MenuItem key={event.id} value={event.id}>
              {event.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
