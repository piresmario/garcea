import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { PageContainer } from "@/components/PageContainer";
import { auth, signOut } from "@/auth";

const links = [
  { href: "/manage/events", label: "Gerir Eventos" },
  { href: "/manage/gallery", label: "Gerir Galeria" },
  { href: "/manage/rancho", label: "Gerir Secção do Rancho" },
  { href: "/manage/historial", label: "Gerir Historial" },
  { href: "/manage/contacts", label: "Mensagens de Contacto" },
];

export default async function ManagePage() {
  const session = await auth();

  return (
    <PageContainer maxWidth="sm">
      <Typography variant="h4" component="h1">
        Gerir Associação GARCEA
      </Typography>
      <Typography color="text.secondary">
        Sessão iniciada como {session?.user?.email}.
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
          Sair
        </Button>
      </form>
    </PageContainer>
  );
}
