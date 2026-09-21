import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { FormCard } from "@/components/FormCard";
import { SubmitButton } from "@/components/SubmitButton";

type HomeSectionFormValues = {
  title: string;
  description: string;
};

export function HomeSectionForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: HomeSectionFormValues;
  submitLabel: string;
}) {
  return (
    <FormCard>
      <Stack component="form" action={action} spacing={2}>
        <TextField label="Título" name="title" required defaultValue={defaultValues?.title} />
        <TextField
          label="Descrição"
          name="description"
          required
          multiline
          rows={6}
          defaultValue={defaultValues?.description}
        />
        <SubmitButton variant="contained" sx={{ alignSelf: "flex-start" }}>
          {submitLabel}
        </SubmitButton>
      </Stack>
    </FormCard>
  );
}
