"use client";

import { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormCard } from "@/components/FormCard";

export function OfficialContactForm({
  action,
}: {
  action: (formData: FormData) => void | Promise<void>;
}) {
  const [type, setType] = useState<"EMAIL" | "PHONE">("EMAIL");

  return (
    <FormCard>
      <Stack component="form" action={action} spacing={2}>
        <FormControl fullWidth>
          <InputLabel id="official-contact-type-label">Tipo</InputLabel>
          <Select
            labelId="official-contact-type-label"
            label="Tipo"
            name="type"
            value={type}
            onChange={(event: SelectChangeEvent) =>
              setType(event.target.value as "EMAIL" | "PHONE")
            }
          >
            <MenuItem value="EMAIL">Email</MenuItem>
            <MenuItem value="PHONE">Número de Telefone</MenuItem>
          </Select>
        </FormControl>

        {type === "EMAIL" ? (
          <TextField label="Email" name="value" type="email" required />
        ) : (
          <TextField label="Número de Telefone" name="value" type="tel" required />
        )}

        <Button type="submit" variant="contained" sx={{ alignSelf: "flex-start" }}>
          Adicionar
        </Button>
      </Stack>
    </FormCard>
  );
}
