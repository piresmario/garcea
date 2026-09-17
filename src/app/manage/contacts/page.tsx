import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import { executeGraphQL } from "@/lib/graphql-server";
import { CONTACT_MESSAGES_QUERY } from "@/lib/queries/contacts";
import { PageContainer } from "@/components/PageContainer";

type ContactMessagesData = {
  contactMessages: {
    id: string;
    name: string;
    email: string;
    message: string;
    submittedAt: string;
  }[];
};

export default async function ManageContactsPage() {
  const data = await executeGraphQL<ContactMessagesData>(CONTACT_MESSAGES_QUERY);

  return (
    <PageContainer maxWidth="md">
      <Typography variant="h4" component="h1">
        Contact Messages
      </Typography>
      {data.contactMessages.length === 0 ? (
        <Typography>No messages yet.</Typography>
      ) : (
        <Stack spacing={2}>
          {data.contactMessages.map((msg) => (
            <Card key={msg.id} variant="outlined">
              <CardContent>
                <Typography sx={{ fontWeight: 500 }}>
                  {msg.name} &lt;{msg.email}&gt;
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(msg.submittedAt).toLocaleString("pt-PT")}
                </Typography>
                <Typography sx={{ mt: 1, whiteSpace: "pre-wrap" }}>
                  {msg.message}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </PageContainer>
  );
}
