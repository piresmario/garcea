import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MuiLink from "@mui/material/Link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { auth, signOut } from "@/auth";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/contacts", label: "Contacts" },
];

export async function Nav() {
  const session = await auth();

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ maxWidth: "lg", width: "100%", mx: "auto" }}>
        <MuiLink
          href="/"
          variant="h6"
          underline="none"
          color="inherit"
          sx={{ flexGrow: 1 }}
        >
          Associação GARCEA
        </MuiLink>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          {links.map((link) => (
            <Button key={link.href} href={link.href} color="inherit">
              {link.label}
            </Button>
          ))}
          {session?.user ? (
            <>
              <Button href="/manage" color="inherit">
                Manage
              </Button>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button type="submit" color="inherit">
                  Logout
                </Button>
              </form>
            </>
          ) : (
            <Button href="/login" color="inherit">
              Login
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
