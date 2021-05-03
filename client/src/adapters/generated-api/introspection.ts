import { IntrospectionResultData } from '@helpers/types'

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
    