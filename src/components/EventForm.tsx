import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type EventFormValues = {
  title: string;
  description: string;
  date: string;
  location: string;
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
      <TextField label="Title" name="title" required defaultValue={defaultValues?.title} />
      <TextField
        label="Description"
        name="description"
        required
        multiline
        rows={4}
        defaultValue={defaultValues?.description}
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        required
        defaultValue={toDateInputValue(defaultValues?.date)}
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <TextField
        label="Location"
        name="location"
        required
        defaultValue={defaultValues?.location}
      />
      <Button type="submit" variant="contained" sx={{ alignSelf: "flex-start" }}>
        {submitLabel}
      </Button>
    </Stack>
  );
}
