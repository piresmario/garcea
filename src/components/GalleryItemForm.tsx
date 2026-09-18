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
import { FormCard } from "@/components/FormCard";

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
    <FormCard>
      <Stack component="form" action={action} spacing={2}>
        <FormControl fullWidth>
          <InputLabel id="type-label">Tipo</InputLabel>
          <Select
            labelId="type-label"
            label="Tipo"
            name="type"
            value={type}
            onChange={(event: SelectChangeEvent) =>
              setType(event.target.value as "PHOTO" | "VIDEO")
            }
          >
            <MenuItem value="PHOTO">Foto</MenuItem>
            <MenuItem value="VIDEO">Vídeo</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="event-label">Evento (opcional)</InputLabel>
          <Select
            labelId="event-label"
            label="Evento (opcional)"
            name="eventId"
            defaultValue=""
          >
            <MenuItem value="">Nenhum</MenuItem>
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
              Ficheiros de foto (selecione vários para enviar todos de uma vez)
            </Typography>
            <input type="file" name="photo" accept="image/*" multiple required />
          </Stack>
        ) : (
          <TextField
            label="Link do Vídeo (YouTube ou Facebook)"
            name="videoUrl"
            type="url"
            required
            placeholder="https://www.youtube.com/watch?v=... ou https://www.facebook.com/.../videos/..."
            helperText="Cole o link normal do vídeo, tal como aparece no YouTube ou no Facebook"
          />
        )}

        <TextField
          label="Legenda (opcional)"
          name="caption"
          helperText={
            type === "PHOTO" ? "Aplicada a todas as fotos enviadas aqui" : undefined
          }
        />

        <Button type="submit" variant="contained" sx={{ alignSelf: "flex-start" }}>
          Enviar
        </Button>
      </Stack>
    </FormCard>
  );
}
