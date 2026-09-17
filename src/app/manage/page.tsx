import { auth, signOut } from "@/auth";

export default async function ManagePage() {
  const session = await auth();

  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col gap-4 px-6 py-16">
      <h1 className="text-2xl font-semibold">Manage Associação GARCEA</h1>
      <p>Signed in as {session?.user?.email}.</p>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button type="submit" className="underline">
          Logout
        </button>
      </form>
    </main>
  );
}
