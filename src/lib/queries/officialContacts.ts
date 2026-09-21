export const OFFICIAL_CONTACTS_QUERY = /* GraphQL */ `
  query OfficialContacts {
    officialContacts {
      id
      type
      label
      value
    }
  }
`;

export const CREATE_OFFICIAL_CONTACT_MUTATION = /* GraphQL */ `
  mutation CreateOfficialContact($input: OfficialContactInput!) {
    createOfficialContact(input: $input) {
      id
    }
  }
`;

export const DELETE_OFFICIAL_CONTACT_MUTATION = /* GraphQL */ `
  mutation DeleteOfficialContact($id: ID!) {
    deleteOfficialContact(id: $id)
  }
`;
