import React from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

import { useListEntriesQuery } from "./generated-api";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Grid() {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [currentPath, setCurrentPath] = React.useState('/')
  const [history, updateHistory] = React.useState<{ id: string, path: string }[]>(
    [{
      id: '/',
      path: '/',
    }]
  )
  const { data, loading, error } = useListEntriesQuery({
    variables: { path: currentPath, page },
  });

  React.useEffect(() => {
    setCurrentPath(history[history.length - 1].path)
  }, [history])

  const rows = React.useMemo(() => {
    const dataRows = data?.listEntries?.entries ?? [] as any

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
    ]
  }, [history.length, data?.listEntries?.entries])

  const rowCount = React.useMemo(() => {
    const totalUpDirRows = currentPath === '/' 
      ? 0 
      : (data?.listEntries?.pagination.pageCount ?? 0) * 1
    const totalRowsFromServer = data?.listEntries?.pagination.totalRows ?? 0
    return  totalRowsFromServer + totalUpDirRows
  }, [
    data?.listEntries?.pagination.pageCount, 
    data?.listEntries?.pagination.totalRows
  ])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  return (
    <Box display="flex" height="100%">
      <Box flexGrow={1}>
        <Paper>
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
                {rows.map(({path, __typename, name, size, id }) => {
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

Grid.whyDidYouRender = true
export default Grid;
