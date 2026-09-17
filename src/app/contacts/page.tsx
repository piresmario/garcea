import { submitContactAction } from "./actions";

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;

  return (
    <main className="mx-auto flex max-w-xl flex-1 flex-col gap-6 px-6 py-16">
      <h1 className="text-2xl font-semibold">Contacts</h1>
      {sent ? (
        <p className="rounded bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-950 dark:text-green-300">
          Thank you, your message has been sent.
        </p>
      ) : (
        <form action={submitContactAction} className="flex flex-col gap-4">
          <div className="hidden" aria-hidden="true">
            <label>
              Company
              <input type="text" name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <label className="flex flex-col gap-1 text-sm">
            Name
            <input
              type="text"
              name="name"
              required
              className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Email
            <input
              type="email"
              name="email"
              required
              className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Message
            <textarea
              name="message"
              required
              rows={5}
              className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
            />
          </label>
          <button
            type="submit"
            className="mt-2 rounded bg-foreground px-4 py-2 text-background"
          >
            Send
          </button>
        </form>
      )}
    </main>
  );
}
