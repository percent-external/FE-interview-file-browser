import React, { memo } from "react";
import { useSelector } from "react-redux";

import { Box, Toolbar, Typography } from "@material-ui/core";

import {
  selectFilterQuery,
  setNameContains,
  setSizeGt,
  setSizeLt,
  setTypeEq,
} from "@redux-reducers/filter-query";

import { CustomFilterInput } from "@components";

function CustomToolbar() {
  const filterQuery = useSelector(selectFilterQuery);
  return (
    <Toolbar>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Typography variant="h5">File Browser</Typography>
        <Box>
          <CustomFilterInput
            title="Name Contains: "
            initialData={filterQuery.nameContains}
            setReduxData={setNameContains}
            width={150}
          />
          <CustomFilterInput
            title="Types: "
            initialData={filterQuery.typeEq}
            setReduxData={setTypeEq}
          />
          <CustomFilterInput
            title="Min File Size: "
            type="number"
            initialData={filterQuery.sizeLt}
            setReduxData={setSizeLt}
            width={50}
          />
          <CustomFilterInput
            title="Max File Size: "
            type="number"
            initialData={filterQuery.sizeGt}
            setReduxData={setSizeGt}
            width={50}
          />
        </Box>
      </Box>
    </Toolbar>
  );
}

export default memo(CustomToolbar);
