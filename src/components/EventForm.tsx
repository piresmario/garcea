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
    <form action={action} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Title
        <input
          type="text"
          name="title"
          required
          defaultValue={defaultValues?.title}
          className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Description
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={defaultValues?.description}
          className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Date
        <input
          type="date"
          name="date"
          required
          defaultValue={toDateInputValue(defaultValues?.date)}
          className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Location
        <input
          type="text"
          name="location"
          required
          defaultValue={defaultValues?.location}
          className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
        />
      </label>
      <button
        type="submit"
        className="mt-2 rounded bg-foreground px-4 py-2 text-background"
      >
        {submitLabel}
      </button>
    </form>
  );
}
