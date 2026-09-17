import { EventForm } from "@/components/EventForm";
import { createEventAction } from "../actions";

export default function NewEventPage() {
  return (
    <main className="mx-auto flex max-w-xl flex-1 flex-col gap-6 px-6 py-16">
      <h1 className="text-2xl font-semibold">New Event</h1>
      <EventForm action={createEventAction} submitLabel="Create" />
    </main>
  );
}
