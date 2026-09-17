import { executeGraphQL } from "@/lib/graphql-server";
import { CONTACT_MESSAGES_QUERY } from "@/lib/queries/contacts";

type ContactMessagesData = {
  contactMessages: {
    id: string;
    name: string;
    email: string;
    message: string;
    submittedAt: string;
  }[];
};

export default async function ManageContactsPage() {
  const data = await executeGraphQL<ContactMessagesData>(CONTACT_MESSAGES_QUERY);

  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col gap-6 px-6 py-16">
      <h1 className="text-2xl font-semibold">Contact Messages</h1>
      {data.contactMessages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {data.contactMessages.map((msg) => (
            <li
              key={msg.id}
              className="rounded border border-black/10 p-4 dark:border-white/10"
            >
              <p className="font-medium">
                {msg.name} &lt;{msg.email}&gt;
              </p>
              <p className="text-xs text-zinc-500">
                {new Date(msg.submittedAt).toLocaleString("pt-PT")}
              </p>
              <p className="mt-2 whitespace-pre-wrap">{msg.message}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
