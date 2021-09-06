import React from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useListEntriesQuery } from "./generated-api";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

enum FILTER {
  NAME,
  TYPE,
  MIN_FILE_SIZE,
  MAX_FILE_SIZE,
}

enum TYPE {
  DIRECTORY = "Directory",
  FILE = "File",
}

function DataGrid() {
  const classes = useStyles();
  const [nameFilter, setNameFilter] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("");
  const [sizeGtFilter, setSizeGtFilter] = React.useState(0);
  const [sizeLtFilter, setSizeLtFilter] = React.useState(0);

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
        name_contains: nameFilter.toLowerCase(),
        type_eq: typeFilter,
        size_gt: sizeGtFilter, // Int
        size_lt: sizeLtFilter,
        /**
         * File Size
         * @name size_gt a number value that file size should be greater than
         * @name size_lt a number value that file size should be less than
         */

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

  const handleDelete = (filterToDelete: FILTER) => {
    setPage(1);
    switch (filterToDelete) {
      case FILTER.NAME:
        setNameFilter("");
        break;
      case FILTER.TYPE:
        setTypeFilter("");
        break;
      case FILTER.MIN_FILE_SIZE:
        setSizeGtFilter(0);
        break;
      case FILTER.MAX_FILE_SIZE:
        setSizeLtFilter(0);
        break;
      default:
        break;
    }
  };

  return (
    <Box display="flex" height="100%">
      <Box flexGrow={1}>
        <Paper>
          <Toolbar>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Typography variant="h6">File Browser</Typography>
              <Box>
                <Chip
                  color="primary"
                  onDelete={() => handleDelete(FILTER.NAME)}
                  label={
                    <Box>
                      <strong>File/Dir Name</strong>
                      <input
                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                          setPage(1);
                          setNameFilter(e.currentTarget.value);
                        }}
                        type="text"
                        value={nameFilter}
                        style={{
                          marginLeft: 8,
                          background: "transparent",
                          color: "white",
                          border: "none",
                          width: 80,
                        }}
                      />
                    </Box>
                  }
                />
              </Box>
              <Box>
                <Chip
                  color="primary"
                  onDelete={() => handleDelete(FILTER.TYPE)}
                  label={
                    <Box>
                      <strong>Type</strong>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={typeFilter}
                        onChange={(
                          e: React.ChangeEvent<{ value: unknown }>
                        ) => {
                          setPage(1);
                          setTypeFilter(e.target.value as TYPE);
                        }}
                        style={{
                          marginLeft: 8,
                          background: "transparent",
                          color: "white",
                          border: "none",
                          width: 120,
                        }}
                      >
                        <MenuItem value={TYPE.DIRECTORY}>
                          {TYPE.DIRECTORY}
                        </MenuItem>
                        <MenuItem value={TYPE.FILE}>{TYPE.FILE}</MenuItem>
                      </Select>
                    </Box>
                  }
                />
              </Box>
              <Box>
                <Chip
                  color="primary"
                  onDelete={() => handleDelete(FILTER.MIN_FILE_SIZE)}
                  label={
                    <Box>
                      <strong>Min File Size</strong>
                      <input
                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                          setPage(1);
                          setSizeGtFilter(Number(e.currentTarget.value));
                        }}
                        type="number"
                        min="1"
                        value={sizeGtFilter === 0 ? "" : sizeGtFilter}
                        style={{
                          marginLeft: 8,
                          background: "transparent",
                          color: "white",
                          border: "none",
                          width: 80,
                        }}
                      />
                    </Box>
                  }
                />
              </Box>
              <Box>
                <Chip
                  color="primary"
                  onDelete={() => handleDelete(FILTER.MAX_FILE_SIZE)}
                  label={
                    <Box>
                      <strong>Max File Size</strong>
                      <input
                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                          setPage(1);
                          setSizeLtFilter(Number(e.currentTarget.value));
                        }}
                        type="number"
                        min="1"
                        value={sizeLtFilter === 0 ? "" : sizeLtFilter}
                        style={{
                          marginLeft: 8,
                          background: "transparent",
                          color: "white",
                          border: "none",
                          width: 80,
                        }}
                      />
                    </Box>
                  }
                />
              </Box>
            </Box>
          </Toolbar>

          {loading ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              paddingY={10}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              <TableContainer>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Path</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Type</TableCell>
                      <TableCell align="right">Size</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(({ path, __typename, name, size, id }) => {
                      const isUpDir = __typename === "UP_DIR";
                      return (
                        <TableRow key={id}>
                          <TableCell component="th" scope="row">
                            <Button
                              color="primary"
                              disabled={__typename === "File"}
                              startIcon={
                                isUpDir ? (
                                  <MoreHorizIcon />
                                ) : __typename === "File" ? null : (
                                  <SubdirectoryArrowRightIcon />
                                )
                              }
                              onClick={() => {
                                updateHistory((h) => {
                                  if (isUpDir && h.length > 1) {
                                    setPage(1);
                                    return [...h.splice(0, h.length - 1)];
                                  } else {
                                    return [...h, { id: path, path }];
                                  }
                                });
                              }}
                            >
                              {!isUpDir ? path : ""}
                            </Button>
                          </TableCell>
                          <TableCell align="right">
                            {isUpDir ? "_" : name}
                          </TableCell>
                          <TableCell align="right">
                            {isUpDir ? "_" : __typename}
                          </TableCell>
                          <TableCell align="right">
                            {isUpDir ? "_" : size}
                          </TableCell>
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
              />{" "}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default DataGrid;
