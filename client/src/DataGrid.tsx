import React, { useState } from "react";
import "./DataGrid.css";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";
import TuneIcon from "@material-ui/icons/Tune";
import ClearIcon from "@material-ui/icons/Clear";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import { useListEntriesQuery } from "./generated-api";

// styling the table with alternate grey & white row & with black header to make each row look seprate from each other
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function DataGrid() {
  const classes = useStyles();

  const [isActive, setActive] = useState(false);
  const [sizeInput, setSizeInput] = useState("");
  const [minMaxType, setMinMaxType] = useState("Max");
  const [sizeGt, setSizeGt] = useState(0);
  const [sizeLt, setSizeLt] = useState(0);
  const [entryName, setEntryName] = useState("");
  const [entryType, setEntryType] = useState("");
  const [page, setPage] = useState(1);
  const [currentPath, setCurrentPath] = useState("/");
  const [history, updateHistory] = useState<{ id: string; path: string }[]>([
    {
      id: "/",
      path: "/",
    },
  ]);

  const { data } = useListEntriesQuery({
    variables: {
      path: currentPath,
      page,
      where: {
        size_gt: sizeGt,
        size_lt: sizeLt,
        name_contains: entryName,
        type_eq: entryType,
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

  // clearing the name filter
  const handleNameDelete = () => {
    setEntryName("");
  };

  // implemented show/hide of the filter options on click since everyone doesn't need the option to filter items
  const handleShowFilter = () => {
    setActive(!isActive);
  };

  // clearing all the entries
  const handelRefresh = () => {
    setEntryName("");
    setEntryType("");
    evaluate(minMaxType, "");
  };

  // updating sizeLt/sizeGt based on the option of min/max chosen by the user and also the size input
  function evaluate(__minMaxType: string, __sizeInput: string) {
    const sizeInputNum: number = Number(__sizeInput);

    if (__minMaxType === "Max") {
      setSizeLt(sizeInputNum);
      setSizeGt(0);
    } else if (__minMaxType === "Min") {
      setSizeLt(0);
      setSizeGt(sizeInputNum);
    } else {
      setSizeLt(0);
      setSizeGt(0);
    }

    setMinMaxType(__minMaxType);
    setSizeInput(__sizeInput);
  }

  return (
    <Box display="flex" height="100%">
      <Box flexGrow={1}>
        <Paper>
          <Toolbar>
            <Box className={isActive ? "fileBrowserClass" : "fileBrowser"}>
              File Browser
            </Box>

            {/* icon for the filters */}
            <TuneIcon
              onClick={handleShowFilter}
              style={{
                fontSize: "16px",
                cursor: "pointer",
                margin: "12px 8px 0 26px",
              }}
            />
            <Box
              style={{
                width: "8%",
                fontSize: "16px",
                marginTop: "11px",
                cursor: "pointer",
              }}
              onClick={handleShowFilter}
            >
              Filters
            </Box>

            {/* all filters are contained in this to enable show/hide */}
            <Box
              id="allFilters"
              className={isActive ? "filterClass" : ""}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TextField
                className="filters"
                label="Name"
                onChange={(e) => setEntryName(String(e.currentTarget.value))}
                value={entryName}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ClearIcon
                        className="cross-icon"
                        onClick={handleNameDelete}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              {/* choosed dropdown design since there are only 3 options to choose from "All, File or Directory" */}
              <FormControl className="filters">
                <InputLabel id="outlined-label">Type</InputLabel>
                <Select
                  labelId="outlined-label"
                  value={entryType}
                  onChange={(e) => setEntryType(String(e.target.value))}
                  label="Type"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="File">File</MenuItem>
                  <MenuItem value="Directory">Directory</MenuItem>
                </Select>
              </FormControl>

              {/* choosed dropdown design since there are only 2 options "Max or Min" */}
              <FormControl style={{ width: "18%", margin: "30px 0 30px 10px" }}>
                <InputLabel id="size-label">File Size</InputLabel>
                <Select
                  labelId="size-label"
                  value={minMaxType}
                  onChange={(e) => evaluate(String(e.target.value), sizeInput)}
                >
                  <MenuItem value={"Min"}>Min</MenuItem>
                  <MenuItem value={"Max"}>Max</MenuItem>
                </Select>
              </FormControl>

              <TextField
                style={{ width: "20%", margin: "46px 0 30px 0" }}
                value={sizeInput}
                onChange={(e) => evaluate(minMaxType, e.currentTarget.value)}
              />

              {/* added clear button so that we don't have to clear each filter individually */}
              <Button
                style={{
                  background: "#000",
                  color: "#fff",
                  margin: "21px",
                  cursor: "pointer",
                  fontFamily: "sans-serif",
                  textTransform: "capitalize",
                }}
                onClick={handelRefresh}
              >
                Clear
              </Button>
            </Box>
          </Toolbar>

          <TableContainer>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Path</StyledTableCell>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Type</StyledTableCell>
                  <StyledTableCell align="right">Size</StyledTableCell>
                </StyledTableRow>
              </TableHead>

              <TableBody>
                {rows.map(({ path, __typename, name, size, id }) => {
                  const isUpDir = __typename === "UP_DIR";
                  return (
                    <StyledTableRow key={id}>
                      <StyledTableCell component="th" scope="row">
                        <Button
                          color="primary"
                          startIcon={
                            isUpDir ? (
                              <MoreHorizIcon />
                            ) : __typename === "File" ? null : (
                              <SubdirectoryArrowRightIcon />
                            )
                          }
                          onClick={() => {
                            // checking if the type is "File" then show the alert message with the clicked file name
                            if (__typename === "File") {
                              alert("You clicked on file " + name);
                            } else {
                              updateHistory((h) => {
                                if (isUpDir && h.length > 1) {
                                  setPage(1);
                                  return [...h.splice(0, h.length - 1)];
                                } else {
                                  return [...h, { id: path, path }];
                                }
                              });
                            }
                          }}
                        >
                          {!isUpDir ? path : ""}
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {isUpDir ? "_" : name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {isUpDir ? "_" : __typename}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {isUpDir ? "_" : size}
                      </StyledTableCell>
                    </StyledTableRow>
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
        </Paper>
      </Box>
    </Box>
  );
}

export default DataGrid;
