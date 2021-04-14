import React from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { DataGrid, GridColDef, GridOverlay, GridRowData, GridCellParams } from '@material-ui/data-grid';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

import "./App.css";
import { useListEntriesQuery } from "./generated-api";

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

function App() {
  const [currentPath, setCurrentPath] = React.useState('/')
  const [history, updateHistory] = React.useState<{ id: string, path: string }[]>(
    [{
      id: '/',
      path: '/',
    }]
  )
  const { data, loading, error } = useListEntriesQuery({
    variables: { path: currentPath },
  });

  const columns: GridColDef[] = [
    { 
      type: "string",
      field: 'path', 
      headerName: 'Path', 
      width: 370,
      renderCell: (params: GridCellParams) => {
        const isUpDir = params.row.__typename === 'UP_DIR'

        return (
          <Button
            color="primary"
            disabled={params.row.__typename === 'File'}
            startIcon={isUpDir 
              ? (<MoreHorizIcon />)
              : (params.row.__typename === 'File' ? null : <SubdirectoryArrowRightIcon />)
            }
            onClick={() => {
              const path = String(params.value)
              updateHistory((h) => {
                if (isUpDir && h.length > 1) {                  
                  return [...h.splice(0, h.length - 1)]
                } else {
                  return ([...h, { id: path, path }])
                }
              })
            }}
          >
            {!isUpDir ? params.value : ''}
          </Button>
        )}
    },
    { 
      field: 'name', 
      headerName: 'Name', 
      width: 170 
    },
    { 
      field: '__typename', 
      headerName: 'Type', 
      width: 170 
    },
  ];

  React.useEffect(() => {
    setCurrentPath(history[history.length - 1].path)
  }, [history])

  const dataRows: GridRowData[] = data?.listEntries?.entries ?? [] as any
  const rows = [
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

  return (
      <Box 
        component="main" 
        className="App-main"
        p={2}
        mx="auto"
        maxWidth={1200}
        height={500}
      > 
        <DataGrid 
          components={{
            LoadingOverlay: CustomLoadingOverlay,
          }}
          loading={loading}
          rows={rows} 
          columns={columns} 
          pageSize={5} 
        />
      </Box>
  );
}

export default App;
