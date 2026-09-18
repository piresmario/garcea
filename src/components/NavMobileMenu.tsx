"use client";

import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";

type NavLink = { href: string; label: string };

export function NavMobileMenu({
  links,
  isLoggedIn,
  signOutAction,
}: {
  links: NavLink[];
  isLoggedIn: boolean;
  signOutAction: () => void | Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        aria-label="Abrir menu"
        color="inherit"
        onClick={() => setOpen(true)}
        sx={{ display: { xs: "inline-flex", md: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260 }} role="presentation">
          <List>
            {links.map((link) => (
              <ListItemButton
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <List>
            {isLoggedIn ? (
              <>
                <ListItemButton href="/manage" onClick={() => setOpen(false)}>
                  <ListItemText primary="Gestão" />
                </ListItemButton>
                <Box component="form" action={signOutAction}>
                  <ListItemButton
                    component="button"
                    type="submit"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    <ListItemText primary="Sair" />
                  </ListItemButton>
                </Box>
              </>
            ) : (
              <ListItemButton href="/login" onClick={() => setOpen(false)}>
                <ListItemText primary="Entrar" />
              </ListItemButton>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
