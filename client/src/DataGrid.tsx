import React, { useState, useEffect, useMemo } from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
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
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

import { useListEntriesQuery } from "./generated-api";
import {DropdownFilter} from "./DropdownFilter";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  input: {
      color: 'white',
  }
});

interface DropDownItems {
  name: string;
  property: string;
}

// Defining the properties to show in the dropdwon
const dropdownItems: DropDownItems[]  = [
  { name: 'File size (min)', property: 'size_gt' },
  { name: 'File size (max)', property: 'size_lt' },
  { name: 'Entry Name', property: 'name_contains' },
  { name: 'Entry Type', property: 'type_eq' },
];

function DataGrid() {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [currentPath, setCurrentPath] = useState('/');
  const [history, updateHistory] = useState<{ id: string, path: string }[]>(
    [{
      id: '/',
      path: '/',
    }]
  );
  const [selectedFilter, setSelectedFilter] = useState<string>('Entry Name');
  const [filterProperty, setFilterProperty] = useState<string>('size_gt');
  const [filterValue, setFilterValue] = useState<number | string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        // Include the filter property and value in the where object
        [filterProperty]: filterValue,
      },
    },
  });

  useEffect(() => {
    setCurrentPath(history[history.length - 1].path);
  }, [history]);

  // Should the selected filter type generate a number or text type input?
  const filterType = filterProperty === 'size_gt' || filterProperty === 'size_lt'? "number" : "text";

  const rows = useMemo(() => {
    const dataRows = data?.listEntries?.entries ?? [] as any;

    return [
      ...(history.length > 1 
        ? [
            {
              id: history[history.length - 2].id,
              path: history[history.length - 2].path,
              name: 'UP_DIR',
              __typename: 'UP_DIR'
            }
          ]
        : []),
      ...dataRows,
    ];
  }, [history.length, data?.listEntries?.entries]); 

  const [anchorEl, setAnchorEl] = useState();
  const rowCount = useMemo(() => {
    const totalUpDirRows = currentPath === '/' 
      ? 0 
      : (data?.listEntries?.pagination.pageCount ?? 0) * 1
    const totalRowsFromServer = data?.listEntries?.pagination.totalRows ?? 0
    return  totalRowsFromServer + totalUpDirRows
  }, [
    data?.listEntries?.pagination.pageCount, 
    data?.listEntries?.pagination.totalRows
  ]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleClear = () => {
    setFilterValue('');
  };  

  const handleClose = (filter?: string) => {
    if (filter) setSelectedFilter(filter);
    setFilterValue('');
    setIsOpen(false);
    setAnchorEl(undefined);
  };

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget)
    setIsOpen(true);
  };

  // on menu item click, set the filter property and close the menu
  const handleMenuItemClick = (filter: string, property: string) => {
    setFilterProperty(property);
    setFilterValue('');
    handleClose(filter);
  };

  const handleChange = (e: any) => {
    if (filterProperty === 'size_gt' || filterProperty === 'size_lt') {
      return setFilterValue(parseInt(e.target.value));
    }
    return setFilterValue(e.target.value);
  };



  return (
    <Box display="flex" height="100%">
      <Box flexGrow={1}>
        <Paper>
          <Toolbar>
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
              <Typography variant="h6">File Browser</Typography>
              <Box>
                <Chip 
                  color="primary" 
                  onDelete={handleClear} 
                  label={
                    <DropdownFilter
                      anchorEl={anchorEl}
                      classes={classes}
                      dropdownItems={dropdownItems}
                      filterValue={filterValue}
                      onChange={handleChange}
                      onClick={handleClick}
                      onClose={handleClose}
                      handleMenuItemClick={handleMenuItemClick}
                      isOpen={isOpen}
                      fieldType={filterType}
                      selectedFilter={selectedFilter}
                    />
                  }
                />
              </Box>
            </Box>
          </Toolbar>
          <TableContainer>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Path</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Size</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(!!rowCount && !loading) && rows.map(({path, __typename, name, size, id }) => {
                  const isUpDir = __typename === 'UP_DIR'
                  return (
                    <TableRow key={id}>
                      <TableCell component="th" scope="row">
                        <Button
                          color="primary"
                          disabled={__typename === 'File'}
                          startIcon={isUpDir 
                            ? (<MoreHorizIcon />)
                            : (__typename === 'File' ? null : <SubdirectoryArrowRightIcon />)
                          }
                          onClick={() => {
                            updateHistory((h) => {
                              if (isUpDir && h.length > 1) {                  
                                setPage(1)
                                return [...h.splice(0, h.length - 1)]
                              } else {
                                return ([...h, { id: path, path }])
                              }
                            })
                          }}
                        >
                          {!isUpDir ? path : ''}
                        </Button>
                      </TableCell>
                      <TableCell align="right">{isUpDir ? '_' : name}</TableCell>
                      <TableCell align="right">{isUpDir ? '_' : __typename}</TableCell>
                      <TableCell align="right">{isUpDir ? '_' : size}</TableCell>
                    </TableRow>
                )})}
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