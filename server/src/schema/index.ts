import gql from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    listEntries(path: String!, page: Int): ListEntriesResult
  }

  type Pagination {
    page: Int!
    pageCount: Int!
    prevPage: Int
    nextPage: Int
  }

  type ListEntriesResult {
    pagination: Pagination!
    entries: [Entry]!
  }

  type File {
    id: String!
    path: String!
    name: String!
    size: Int!
    lastModified: String!
  }

  type Directory {
    id: String!
    path: String!
    name: String!
  }

  union Entry = File | Directory
`;
