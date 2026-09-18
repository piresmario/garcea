export const HISTORIAL_SECTION_QUERY = /* GraphQL */ `
  query HistorialSection {
    historialSection {
      description
      updatedAt
    }
  }
`;

export const UPDATE_HISTORIAL_SECTION_MUTATION = /* GraphQL */ `
  mutation UpdateHistorialSection($description: String!) {
    updateHistorialSection(description: $description) {
      description
    }
  }
`;
