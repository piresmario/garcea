export const SOCIAL_LINKS_QUERY = /* GraphQL */ `
  query SocialLinks {
    socialLinks {
      id
      platform
      url
    }
  }
`;

export const CREATE_SOCIAL_LINK_MUTATION = /* GraphQL */ `
  mutation CreateSocialLink($input: SocialLinkInput!) {
    createSocialLink(input: $input) {
      id
    }
  }
`;

export const DELETE_SOCIAL_LINK_MUTATION = /* GraphQL */ `
  mutation DeleteSocialLink($id: ID!) {
    deleteSocialLink(id: $id)
  }
`;
