import PropTypes from "prop-types";

export const TYPE_COMPONENT = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
  PropTypes.elementType,
]);

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  listEntries?: Maybe<ListEntriesResult>;
};

export type QueryListEntriesArgs = {
  path: Scalars["String"];
  page?: Maybe<Scalars["Int"]>;
  where?: Maybe<WhereInput>;
};

export type WhereInput = {
  size_gt?: Maybe<Scalars["Int"]>;
  size_lt?: Maybe<Scalars["Int"]>;
  name_contains?: Maybe<Scalars["String"]>;
  type_eq?: Maybe<Scalars["String"]>;
};

export type Pagination = {
  __typename?: "Pagination";
  page: Scalars["Int"];
  pageCount: Scalars["Int"];
  prevPage?: Maybe<Scalars["Int"]>;
  nextPage?: Maybe<Scalars["Int"]>;
  totalRows?: Maybe<Scalars["Int"]>;
};

export type ListEntriesResult = {
  __typename?: "ListEntriesResult";
  pagination: Pagination;
  entries: Array<Maybe<Entry>>;
};

export type File = {
  __typename?: "File";
  id: Scalars["String"];
  path: Scalars["String"];
  name: Scalars["String"];
  size: Scalars["Int"];
  lastModified: Scalars["String"];
};

export type Directory = {
  __typename?: "Directory";
  id: Scalars["String"];
  path: Scalars["String"];
  name: Scalars["String"];
};

export type Entry = File | Directory;

export type ListEntriesQueryVariables = Exact<{
  path: Scalars["String"];
  page?: Maybe<Scalars["Int"]>;
  where?: Maybe<WhereInput>;
}>;

export type ListEntriesQuery = { __typename?: "Query" } & {
  listEntries?: Maybe<
    { __typename?: "ListEntriesResult" } & {
      pagination: { __typename?: "Pagination" } & Pick<
        Pagination,
        "page" | "pageCount" | "prevPage" | "nextPage" | "totalRows"
      >;
      entries: Array<
        Maybe<
          | ({ __typename: "File" } & Pick<
              File,
              "id" | "path" | "name" | "size" | "lastModified"
            >)
          | ({ __typename: "Directory" } & Pick<
              Directory,
              "id" | "path" | "name"
            >)
        >
      >;
    }
  >;
};

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}

export type FilterQuery = {
  nameContains: string | null;
  typeEq: string | null;
  sizeGt: number | null;
  sizeLt: number | null;
};
