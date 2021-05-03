import React, { memo } from "react";

import { Box, Paper } from "@material-ui/core";

import { CustomToolbar, DataTable } from "@components";

function DataGrid() {
  return (
    <Box display="flex" height="100%">
      <Box flexGrow={1}>
        <Paper>
          <CustomToolbar />
          <DataTable />
        </Paper>
      </Box>
    </Box>
  );
}

export default memo(DataGrid);
