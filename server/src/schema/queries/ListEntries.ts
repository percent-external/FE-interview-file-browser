import gql from 'graphql-tag';

export const ListEntries = gql`
  query ListEntries($path: String!, $page: Int, $where: WhereInput) {
    listEntries(path: $path, page: $page, where: $where) {
      pagination {
        page
        pageCount
        prevPage
        nextPage
        totalRows
      }
      entries {
        __typename
        ... on File {
          id
          path
          name
          size
          lastModified
        }
        ... on Directory {
          id
          path
          name
        }
      }
    }
  }
`;
