
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
      const result: IntrospectionResultData = {
  "__schema": {
    "types": [
      {
        "kind": "UNION",
        "name": "Entry",
        "possibleTypes": [
          {
            "name": "File"
          },
          {
            "name": "Directory"
          }
        ]
      }
    ]
  }
};
      export default result;
    