"use client";

import { forwardRef } from "react";
import NextLink from "next/link";

/**
 * Registered as the default LinkComponent/MuiLink component on the theme
 * (see src/theme.ts) so Server Component pages can pass a plain `href`
 * string to Button/CardActionArea/ListItemButton/Link/etc. without ever
 * passing a component reference across the Server->Client boundary
 * (that fails with "Functions cannot be passed directly to Client
 * Components").
 */
export const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  { href: string } & Omit<React.ComponentProps<typeof NextLink>, "href">
>(function LinkBehavior(props, ref) {
  const { href, ...other } = props;
  return <NextLink ref={ref} href={href} {...other} />;
});
