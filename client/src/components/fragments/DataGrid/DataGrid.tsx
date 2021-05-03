import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

import CustomToolbar from "@components/CustomToolbar";
import DataTable from "@components/DataTable";

function DataGrid() {
  const [sizeGt, setSizeGt] = useState(200);

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
          <DataTable />
        </Paper>
      </Box>
    </Box>
  );
}

export default DataGrid;
