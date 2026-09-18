import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          gap: 2,
        }}
      >
        {links.map((link) => (
          <Card
            key={link.href}
            variant="outlined"
            sx={{
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": { transform: "translateY(-2px)", boxShadow: 3 },
            }}
          >
            <CardActionArea href={link.href} sx={{ p: 2.5 }}>
              <Typography sx={{ fontWeight: 600 }}>{link.label}</Typography>
            </CardActionArea>
          </Card>
        ))}
      </Box>
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
