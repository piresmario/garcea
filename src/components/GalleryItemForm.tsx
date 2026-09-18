"use client";

import { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type EventOption = { id: string; title: string };

export function GalleryItemForm({
  action,
  events,
}: {
  action: (formData: FormData) => void | Promise<void>;
  events: EventOption[];
}) {
  const [type, setType] = useState<"PHOTO" | "VIDEO">("PHOTO");

  return (
    <Stack component="form" action={action} spacing={2}>
      <FormControl fullWidth>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          label="Type"
          name="type"
          value={type}
          onChange={(event: SelectChangeEvent) =>
            setType(event.target.value as "PHOTO" | "VIDEO")
          }
        >
          <MenuItem value="PHOTO">Photo</MenuItem>
          <MenuItem value="VIDEO">Video</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="event-label">Event (optional)</InputLabel>
        <Select
          labelId="event-label"
          label="Event (optional)"
          name="eventId"
          defaultValue=""
        >
          <MenuItem value="">None</MenuItem>
          {events.map((event) => (
            <MenuItem key={event.id} value={event.id}>
              {event.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {type === "PHOTO" ? (
        <Stack spacing={0.5}>
          <Typography variant="body2" color="text.secondary">
            Photo files (select multiple to upload them all at once)
          </Typography>
          <input type="file" name="photo" accept="image/*" multiple required />
        </Stack>
      ) : (
        <TextField
          label="Video embed URL"
          name="videoUrl"
          type="url"
          required
          placeholder="https://www.youtube.com/embed/VIDEO_ID"
        />
      )}

      <TextField
        label="Caption (optional)"
        name="caption"
        helperText={type === "PHOTO" ? "Applied to every photo uploaded here" : undefined}
      />

      <Button type="submit" variant="contained" sx={{ alignSelf: "flex-start" }}>
        Upload
      </Button>
    </Stack>
  );
}
