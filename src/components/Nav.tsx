import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MuiLink from "@mui/material/Link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { auth, signOut } from "@/auth";
import { NavMobileMenu } from "@/components/NavMobileMenu";

const links = [
  { href: "/", label: "Início" },
  { href: "/historial", label: "Historial" },
  { href: "/events", label: "Eventos" },
  { href: "/contacts", label: "Contactos" },
];

export async function Nav() {
  const session = await auth();

  async function signOutAction() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ top: 0 }}>
      <Toolbar sx={{ maxWidth: "lg", width: "100%", mx: "auto" }}>
        <MuiLink
          href="/"
          underline="none"
          color="inherit"
          sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 1.5 }}
        >
          <Image
            src="/logo.png"
            alt=""
            width={80}
            height={80}
            style={{ width: "2.5rem", height: "2.5rem" }}
          />
          <Box
            component="span"
            sx={{
              fontSize: "1.25rem",
              fontWeight: 500,
              display: { xs: "none", sm: "inline" },
            }}
          >
            Associação GARCEA
          </Box>
        </MuiLink>

        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", display: { xs: "none", md: "flex" } }}
        >
          {links.map((link) => (
            <Button key={link.href} href={link.href} color="inherit">
              {link.label}
            </Button>
          ))}
          {session?.user ? (
            <>
              <Button href="/manage" color="inherit">
                Gestão
              </Button>
              <form action={signOutAction}>
                <Button type="submit" color="inherit">
                  Sair
                </Button>
              </form>
            </>
          ) : (
            <Button href="/login" color="inherit">
              Entrar
            </Button>
          )}
        </Stack>

        <NavMobileMenu
          links={links}
          isLoggedIn={!!session?.user}
          signOutAction={signOutAction}
        />
      </Toolbar>
    </AppBar>
  );
}
