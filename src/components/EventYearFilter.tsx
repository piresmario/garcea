"use client";

import { useRouter } from "next/navigation";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export function EventYearFilter({
  years,
  selectedYear,
}: {
  years: number[];
  selectedYear: number;
}) {
  const router = useRouter();

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel id="event-year-filter-label">Ano</InputLabel>
      <Select
        labelId="event-year-filter-label"
        label="Ano"
        value={selectedYear}
        onChange={(event: SelectChangeEvent<number>) =>
          router.push(`/events?year=${event.target.value}`)
        }
      >
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
