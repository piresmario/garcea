import Typography from "@mui/material/Typography";
import { PageContainer } from "@/components/PageContainer";
import { EventForm } from "@/components/EventForm";
import { createEventAction } from "../actions";

export default function NewEventPage() {
  return (
    <PageContainer maxWidth="sm">
      <Typography variant="h4" component="h1">
        Novo Evento
      </Typography>
      <EventForm action={createEventAction} submitLabel="Criar" />
    </PageContainer>
  );
}
