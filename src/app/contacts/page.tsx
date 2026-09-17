import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { PageContainer } from "@/components/PageContainer";
import { submitContactAction } from "./actions";

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;

  return (
    <PageContainer maxWidth="sm">
      <Typography variant="h4" component="h1">
        Contacts
      </Typography>
      {sent ? (
        <Alert severity="success">Thank you, your message has been sent.</Alert>
      ) : (
        <Stack component="form" action={submitContactAction} spacing={2}>
          <Box sx={{ display: "none" }} aria-hidden="true">
            <label>
              Company
              <input type="text" name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </Box>
          <TextField label="Name" name="name" required />
          <TextField label="Email" name="email" type="email" required />
          <TextField label="Message" name="message" required multiline rows={5} />
          <Button type="submit" variant="contained" sx={{ alignSelf: "flex-start" }}>
            Send
          </Button>
        </Stack>
      )}
    </PageContainer>
  );
}
