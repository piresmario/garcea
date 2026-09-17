export const CONTACT_MESSAGES_QUERY = /* GraphQL */ `
  query ContactMessages {
    contactMessages {
      id
      name
      email
      message
      submittedAt
    }
  }
`;

export const SUBMIT_CONTACT_MESSAGE_MUTATION = /* GraphQL */ `
  mutation SubmitContactMessage($input: ContactMessageInput!) {
    submitContactMessage(input: $input) {
      id
    }
  }
`;
