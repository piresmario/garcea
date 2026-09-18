import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { isPdfUrl } from "@/lib/supabase-storage";

type EventFormValues = {
  title: string;
  description: string;
  date: string;
  location: string;
  posterUrl?: string | null;
};

function toDateInputValue(iso?: string) {
  if (!iso) return "";
  const date = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function EventForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: EventFormValues;
  submitLabel: string;
}) {
  return (
    <Stack component="form" action={action} spacing={2}>
      <TextField label="Título" name="title" required defaultValue={defaultValues?.title} />
      <TextField
        label="Descrição"
        name="description"
        required
        multiline
        rows={4}
        defaultValue={defaultValues?.description}
      />
      <TextField
        label="Data"
        name="date"
        type="date"
        required
        defaultValue={toDateInputValue(defaultValues?.date)}
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <TextField
        label="Localização"
        name="location"
        required
        defaultValue={defaultValues?.location}
      />

      <Stack spacing={0.5}>
        <Typography variant="body2" color="text.secondary">
          Cartaz (opcional)
        </Typography>
        {defaultValues?.posterUrl &&
          (isPdfUrl(defaultValues.posterUrl) ? (
            <Typography variant="body2">
              <a href={defaultValues.posterUrl} target="_blank" rel="noreferrer">
                Ver cartaz atual (PDF)
              </a>
            </Typography>
          ) : (
            <Box
              component="img"
              src={defaultValues.posterUrl}
              alt=""
              sx={{ maxWidth: 200, borderRadius: 1 }}
            />
          ))}
        <input type="file" name="cartaz" accept="image/*,application/pdf" />
        {defaultValues?.posterUrl && (
          <label style={{ fontSize: "0.875rem" }}>
            <input type="checkbox" name="removePoster" /> Remover cartaz atual
          </label>
        )}
      </Stack>

      <Button type="submit" variant="contained" sx={{ alignSelf: "flex-start" }}>
        {submitLabel}
      </Button>
    </Stack>
  );
}
