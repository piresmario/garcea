import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { LinkBehavior } from "@/components/LinkBehavior";

const baseTheme = createTheme({
  palette: {
    primary: { main: "#0340d8" },
    secondary: { main: "#e0a52c" },
    background: { default: "#f7f8fb" },
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
        root: { textTransform: "none", fontWeight: 600 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: "#ffffff" },
      },
    },
  },
});

// Higher factor = smaller minimum size at the xs breakpoint: MUI computes it
// as 1 + (maxFontSize - 1) / factor, so a higher factor divides more off the
// top before adding the 1rem floor back. Bumped from the default of 2 to
// shrink headings/titles more aggressively on phones specifically.
export const theme = responsiveFontSizes(baseTheme, { factor: 6 });
