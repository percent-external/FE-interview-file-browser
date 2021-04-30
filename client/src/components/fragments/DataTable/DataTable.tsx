import React from "react";
import PropTypes, { InferProps } from "prop-types";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";
import TablePagination from "@material-ui/core/TablePagination";
import { makeStyles } from "@material-ui/core/styles";
import { getType } from "@helpers/methods";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function DataTable({
  rows,
  updateHistory,
  setPage,
  rowCount,
  page,
  handleChangePage,
}: InferProps<typeof DataTable.propTypes>) {
  const classes = useStyles();
  return (
    <>
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
                        updateHistory((h: { id: string; path: string }[]) => {
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
                  <TableCell align="right">{isUpDir ? "_" : name}</TableCell>
                  <TableCell align="right">
                    {isUpDir ? "_" : getType(__typename, name)}
                  </TableCell>
                  <TableCell align="right">{isUpDir ? "_" : size}</TableCell>
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

DataTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      __typename: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  updateHistory: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
};

export default DataTable;
