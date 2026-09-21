import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { LinkBehavior } from "@/components/LinkBehavior";

const baseTheme = createTheme({
  cssVariables: {
    // Must match @mui/material/InitColorSchemeScript's default `attribute`
    // (rendered in layout.tsx) so toggling `setMode` actually swaps the
    // generated CSS variables instead of only following the OS preference.
    colorSchemeSelector: '[data-mui-color-scheme="%s"]',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#0340d8" },
        secondary: { main: "#e0a52c" },
        background: { default: "#f7f8fb", paper: "#ffffff" },
      },
    },
    dark: {
      palette: {
        primary: { main: "#8ea6ff" },
        secondary: { main: "#e6b84f" },
        background: { default: "#0c0f16", paper: "#151a24" },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "transform 0.15s ease, background-color 0.15s ease",
          "&:hover": {
            transform: "scale(1.08)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: (theme.vars ?? theme).palette.background.paper,
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        outlined: ({ theme }) => ({
          boxShadow: (theme.vars ?? theme).shadows[1],
        }),
      },
    },
  },
});

// Higher factor = smaller minimum size at the xs breakpoint: MUI computes it
// as 1 + (maxFontSize - 1) / factor, so a higher factor divides more off the
// top before adding the 1rem floor back. Bumped from the default of 2 to
// shrink headings/titles more aggressively on phones specifically.
export const theme = responsiveFontSizes(baseTheme, { factor: 6 });
