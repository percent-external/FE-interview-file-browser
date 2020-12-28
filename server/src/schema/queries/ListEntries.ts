import gql from 'graphql-tag';

export const ListEntries = gql`
  query ListEntries($path: String!, $page: Int) {
    listEntries(path: $path, page: $page) {
      pagination {
        page
        pageCount
        prevPage
        nextPage
      }
      entries {
        __typename
        ... on File {
          path
          name
          size
          lastModified
        }
        ... on Directory {
          path
          name
        }
      }
    }
  }
`;
