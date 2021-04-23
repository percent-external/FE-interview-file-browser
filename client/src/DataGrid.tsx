//@ts-nocheck
import React from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Skeleton from '@material-ui/lab/Skeleton';

import { motion, AnimatePresence } from 'framer-motion'

import { useListEntriesQuery } from './generated-api'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650
    }
  }),
);

function DataGrid () {
  const classes = useStyles()
  const [fileType, setFileType] = React.useState('');
  const [sizeGt, setSizeGt] = React.useState(200)
  const [sizeLt, setSizeLt] = React.useState(200)
  const [fileName, setFileName] = React.useState("")

  const [page, setPage] = React.useState(1)
  const [currentPath, setCurrentPath] = React.useState('/')
  const [history, updateHistory] = React.useState<
    { id: string; path: string }[]
  >([
    {
      id: '/',
      path: '/'
    }
  ])
  const { data, loading, error } = useListEntriesQuery({
    variables: {
      path: currentPath,
      page,
      where: {

        size_gt: sizeGt,
        size_lt: sizeLt,
        name_contains:fileName,
        type_eq:fileType

        /**
         * File Size
         * @name size_gt a number value that file size should be greater than
         *
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
        
      }
    }
  })

  React.useEffect(() => {
    setCurrentPath(history[history.length - 1].path)
  }, [history])

  const rows = React.useMemo(() => {
    const dataRows = data?.listEntries?.entries ?? ([] as any)

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
      ...dataRows
    ]
  }, [history.length, data?.listEntries?.entries])

  const rowCount = React.useMemo(() => {
    const totalUpDirRows =
      currentPath === '/'
        ? 0
        : (data?.listEntries?.pagination.pageCount ?? 0) * 1
    const totalRowsFromServer = data?.listEntries?.pagination.totalRows ?? 0
    return totalRowsFromServer + totalUpDirRows
  }, [
    data?.listEntries?.pagination.pageCount,
    data?.listEntries?.pagination.totalRows
  ])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFileType(event.target.value as string);
  };

  const resetFileName = () => {
    setFileName("")
  }
  const resetLt = () => {
    setSizeLt(0)
  }
  const resetGt = () => {
    setSizeGt(0)
  }

  if (loading) {
    return(
     <div>
       <h2>loading</h2>
    <Skeleton />
    <Skeleton animation={false} />
    <Skeleton animation="wave" />
    </div>)
  }
  if (error) {

    return <img src="/error-car.jpg" alt=""/>

  }

  return (
    <Box display='flex' height='100%'>
      <Box flexGrow={1}>
        <Paper>
          <Toolbar>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              width='100%'
            >
              <Typography variant='h4'>File Browser</Typography>
              <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">File Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fileType}
          onChange={handleChange}
        >
          <MenuItem value={""}>Any</MenuItem>
          <MenuItem value={"Directory"}>Directory</MenuItem>
          <MenuItem value={"File"}>File</MenuItem>
        </Select>
      </FormControl>
              <Box>
                <Chip
                  color='primary'
                  onDelete={resetFileName}
                  label={
                    <Box>
                      <strong>Filter File Name</strong>
                      <input
                        onChange={e => setFileName(String(e.currentTarget.value))}
                        type='string'
                        value={fileName}
                        style={{
                          marginLeft: 8,
                          background: 'transparent',
                          color: 'white',
                          border: 'none',
                          width: 80
                        }}
                        placeholder='Filter Value'
                      />
                    </Box>
                  }
                />
              </Box>
              <Box>
                <Chip
                  color='primary'
                  onDelete={resetFileName}
                  label={
                    <Box>
                      <strong>Filter File Name;</strong>
                      <input
                        onChange={e => setFileName(String(e.currentTarget.value))}
                        type='string'
                        value={fileName}
                        style={{
                          marginLeft: 8,
                          background: 'transparent',
                          color: 'white',
                          border: 'none',
                          width: 80
                        }}
                        placeholder='Filter Value'
                      />
                    </Box>
                  }
                />
              </Box>
              <Box>
                <Chip
                  color='primary'
                  onDelete={resetLt}
                  label={
                    <Box>
                      <strong>Max File Size &lt;</strong>
                      <input
                        onChange={e => setSizeLt(Number(e.currentTarget.value))}
                        type='number'
                        value={sizeLt}
                        style={{
                          marginLeft: 8,
                          background: 'transparent',
                          color: 'white',
                          border: 'none',
                          width: 80
                        }}
                        placeholder='Filter Value'
                      />
                    </Box>
                  }
                />
              </Box>
              <Box>
                <Chip
                  color='primary'
                  onDelete={resetGt}
                  label={
                    <Box>
                      <strong>Min File Size &gt;</strong>
                      <input
                        onChange={e => setSizeGt(Number(e.currentTarget.value))}
                        type='number'
                        value={sizeGt}
                        style={{
                          marginLeft: 8,
                          background: 'transparent',
                          color: 'white',
                          border: 'none',
                          width: 80
                        }}
                        placeholder='Filter Value'
                      />
                    </Box>
                  }
                />
              </Box>
            </Box>
          </Toolbar>
          <TableContainer>
            <Table
              className={classes.table}
              size='medium'
              aria-label='a dense table'
            >
              <TableHead>
                <TableRow>
                  <TableCell>Path</TableCell>
                  <TableCell align='right'>Name</TableCell>
                  <TableCell align='right'>Type</TableCell>
                  <TableCell align='right'>Size</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              <AnimatePresence>
                {console.log(rows)}
                {rows.map(({ path, __typename, name, size, id }) => {
                  const isUpDir = __typename === 'UP_DIR'
                  return (
                    <TableRow component={motion.div} whileHover={{
                      scale: 1.021,
                      transition: { duration: 0.3 }
                    }}
                    
                    layout
                    exit={{ opacity: 0, maxHeight: 0 }}
                     key={id}>
                      <TableCell component={motion.th} scope='row' >
                        <Button
                          color='primary'
                          disabled={__typename === 'File'}
                          startIcon={
                            isUpDir ? (
                              <MoreHorizIcon />
                            ) : __typename === 'File' ? null : (
                              <SubdirectoryArrowRightIcon />
                            )
                          }
                          onClick={() => {
                            updateHistory(h => {
                              if (isUpDir && h.length > 1) {
                                setPage(1)
                                return [...h.splice(0, h.length - 1)]
                              } else {
                                return [...h, { id: path, path }]
                              }
                            })
                          }}
                        >
                          {!isUpDir ? path : ''}
                        </Button>
                      </TableCell>
                      <TableCell align='right'>
                        {isUpDir ? '_' : name}
                      </TableCell>
                      <TableCell align='right'>
                        {isUpDir ? '_' : __typename}
                      </TableCell>
                      <TableCell align='right'>
                        {isUpDir ? '_' : size}
                      </TableCell>
                    </TableRow>
                  )
                })}
                </AnimatePresence>
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[]}
            component='div'
            count={rowCount}
            rowsPerPage={25}
            page={page - 1}
            onChangePage={handleChangePage}
          />
        </Paper>
      </Box>
    </Box>
  )
}

export default DataGrid
