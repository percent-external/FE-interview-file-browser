import React from "react";
import PropTypes, { InferProps } from "prop-types";

import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

function CustomToolbar({
  handleDelete,
  sizeGt,
  setSizeGt,
}: InferProps<typeof CustomToolbar.propTypes>) {
  return (
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
            onDelete={handleDelete}
            label={
              <Box>
                <strong>File Size &gt;</strong>
                <input
                  onChange={(e) => setSizeGt(Number(e.currentTarget.value))}
                  type="number"
                  value={sizeGt}
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
  );
}

CustomToolbar.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  sizeGt: PropTypes.number.isRequired,
  setSizeGt: PropTypes.func.isRequired,
};

export default CustomToolbar;
