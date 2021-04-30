import React from "react";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

import { useListEntriesQuery } from "../../../generated-api";
import CustomToolbar from "@components/CustomToolbar";
import DataTable from "@components/DataTable";

function DataGrid() {
  const [sizeGt, setSizeGt] = React.useState(200);
  const [page, setPage] = React.useState(1);
  const [currentPath, setCurrentPath] = React.useState("/");
  const [history, updateHistory] = React.useState<
    { id: string; path: string }[]
  >([
    {
      id: "/",
      path: "/",
    },
  ]);
  const { data, loading, error } = useListEntriesQuery({
    variables: {
      path: currentPath,
      page,
      where: {
        /**
         * File Size
         * @name size_gt a number value that file size should be greater than
         * @name size_lt a number value that file size should be less than
         */
        // size_gt: sizeGt, // Int
        // size_lt: Int,
        /**
         * Entry Name Contains
         * @name name_contains an entry "name" text value to search on
         */
        // name_contains: String,
        /**
         * Type Equals
         * @name type_eq Exact match for Entry type
         */
        // type_eq: "Directory" | "File",
      },
    },
  });

  React.useEffect(() => {
    setCurrentPath(history[history.length - 1].path);
  }, [history]);

  const rows = React.useMemo(() => {
    const dataRows = data?.listEntries?.entries ?? ([] as any);

    return [
      ...(history.length > 1
        ? [
            {
              id: history[history.length - 2].id,
              path: history[history.length - 2].path,
              name: "UP_DIR",
              __typename: "UP_DIR",
            },
          ]
        : []),
      ...dataRows,
    ];
  }, [history.length, data?.listEntries?.entries]);

  const rowCount = React.useMemo(() => {
    const totalUpDirRows =
      currentPath === "/"
        ? 0
        : (data?.listEntries?.pagination.pageCount ?? 0) * 1;
    const totalRowsFromServer = data?.listEntries?.pagination.totalRows ?? 0;
    return totalRowsFromServer + totalUpDirRows;
  }, [
    data?.listEntries?.pagination.pageCount,
    data?.listEntries?.pagination.totalRows,
  ]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleDelete = () => {
    setSizeGt(0);
  };

  return (
    <Box display="flex" height="100%">
      <Box flexGrow={1}>
        <Paper>
          <CustomToolbar
            handleDelete={handleDelete}
            sizeGt={sizeGt}
            setSizeGt={setSizeGt}
          />
          <DataTable
            rows={rows}
            updateHistory={updateHistory}
            page={page}
            setPage={setPage}
            rowCount={rowCount}
            handleChangePage={handleChangePage}
          />
        </Paper>
      </Box>
    </Box>
  );
}

export default DataGrid;
