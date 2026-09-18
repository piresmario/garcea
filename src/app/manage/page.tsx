import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { PageContainer } from "@/components/PageContainer";
import { auth, signOut } from "@/auth";

const links = [
  { href: "/manage/events", label: "Manage Events" },
  { href: "/manage/gallery", label: "Manage Gallery" },
  { href: "/manage/rancho", label: "Manage Rancho Section" },
  { href: "/manage/historial", label: "Manage Historial" },
  { href: "/manage/contacts", label: "Contact Messages" },
];

export default async function ManagePage() {
  const session = await auth();

  return (
    <PageContainer maxWidth="sm">
      <Typography variant="h4" component="h1">
        Manage Associação GARCEA
      </Typography>
      <Typography color="text.secondary">
        Signed in as {session?.user?.email}.
      </Typography>
      <List disablePadding>
        {links.map((link) => (
          <ListItemButton key={link.href} href={link.href}>
            <ListItemText primary={link.label} />
          </ListItemButton>
        ))}
      </List>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button type="submit" variant="outlined">
          Logout
        </Button>
      </form>
    </PageContainer>
  );
}
