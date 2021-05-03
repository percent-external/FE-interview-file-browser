import React, { useState, useEffect, useMemo, memo } from "react";
import { useSelector } from "react-redux";

import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  makeStyles,
} from "@material-ui/core";
import BackIcon from "@material-ui/icons/ArrowBack";

import { Entry } from "@helpers/types";
import { color, spaceDt } from "@helpers/styles";
import { getFileSize, getFormattedDateTime, getType } from "@helpers/methods";
import { useListEntriesQuery } from "@adapters/generated-api";

import { selectFilterQuery } from "@redux-reducers/filter-query";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    cursor: "default",
    "-webkit-touch-callout": "none" /* iOS Safari */,
    "-webkit-user-select": "none" /* Safari */,
    "-khtml-user-select": "none" /* Konqueror HTML */,
    "-moz-user-select": "none" /* Old versions of Firefox */,
    "-ms-user-select": "none" /* Internet Explorer/Edge */,
    "user-select":
      "none" /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */,
  },
  tableRow: {
    "&:hover": {
      backgroundColor: color.bg.hover,
    },
  },
  tableRowSelected: {
    backgroundColor: color.bg.selected,
  },
});

function DataTable() {
  const classes = useStyles();
  const filterQuery = useSelector(selectFilterQuery);
  const [page, setPage] = useState(1);
  const [selectedRowID, setSelectedRowID] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState("/");
  const [history, updateHistory] = useState<{ id: string; path: string }[]>([
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
        size_gt: filterQuery.sizeGt ?? 0, // Int
        size_lt: filterQuery.sizeLt ?? 0, // Int,
        /**
         * Entry Name Contains
         * @name name_contains an entry "name" text value to search on
         */
        name_contains: filterQuery.nameContains ?? "", // String,
        /**
         * Type Equals
         * @name type_eq Exact match for Entry type
         */
        // type_eq: "Directory" | "File",
      },
    },
  });

  console.log(filterQuery);

  useEffect(() => {
    setSelectedRowID(null);
    setCurrentPath(history[history.length - 1].path);
  }, [history]);

  const rows = useMemo(() => {
    return data?.listEntries?.entries ?? ([] as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.listEntries?.entries]);

  const rowCount = useMemo(() => {
    return data?.listEntries?.pagination.totalRows ?? 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    data?.listEntries?.pagination.pageCount,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    data?.listEntries?.pagination.totalRows,
  ]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        marginLeft={spaceDt(2)}
        marginBottom={spaceDt(2)}
      >
        <Button
          color="primary"
          disabled={history.length <= 1}
          onClick={() => {
            updateHistory((h: { id: string; path: string }[]) => {
              setPage(1);
              return [...h.splice(0, h.length - 1)];
            });
          }}
        >
          <BackIcon />
        </Button>
        <Typography variant="inherit">{currentPath}</Typography>
      </Box>
      <TableContainer>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {/* <TableCell>Path</TableCell> */}
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Last modified</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="right">Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((entry: Entry) => {
              const { path, __typename, name, id } = entry;
              const lastModified =
                __typename === "File"
                  ? ((entry as unknown) as File).lastModified
                  : null;
              const size =
                __typename === "File"
                  ? ((entry as unknown) as File).size
                  : null;
              return (
                <TableRow
                  key={id}
                  className={
                    selectedRowID === id
                      ? classes.tableRowSelected
                      : classes.tableRow
                  }
                  onClick={() => {
                    setSelectedRowID(id);
                  }}
                  onDoubleClick={() => {
                    if (__typename === "Directory") {
                      updateHistory((h: { id: string; path: string }[]) => {
                        return [...h, { id: path, path }];
                      });
                    }
                  }}
                >
                  <TableCell align="left">{name}</TableCell>
                  <TableCell align="left">
                    {!lastModified
                      ? null
                      : getFormattedDateTime(new Date(lastModified))}
                  </TableCell>
                  <TableCell align="left">
                    {getType(__typename, name)}
                  </TableCell>
                  <TableCell align="right">{getFileSize(size)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={rowCount}
        rowsPerPage={25}
        page={page - 1}
        onChangePage={handleChangePage}
      />
    </>
  );
}

export default memo(DataTable);
