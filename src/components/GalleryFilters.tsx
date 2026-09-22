"use client";

import { useRouter } from "next/navigation";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type EventOption = { id: string; title: string };

export function GalleryFilters({
  events,
  selectedEventId,
}: {
  events: EventOption[];
  selectedEventId?: string;
}) {
  const router = useRouter();

  return (
    <FormControl size="small" sx={{ minWidth: 200 }}>
      <InputLabel id="gallery-event-filter-label">Evento</InputLabel>
      <Select
        labelId="gallery-event-filter-label"
        label="Evento"
        value={selectedEventId ?? ""}
        onChange={(event: SelectChangeEvent) => {
          const eventId = event.target.value;
          router.push(eventId ? `/manage/gallery?eventId=${eventId}` : "/manage/gallery");
        }}
      >
        <MenuItem value="">Todos</MenuItem>
        {events.map((event) => (
          <MenuItem key={event.id} value={event.id}>
            {event.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
