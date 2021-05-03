import React, { memo, useState } from "react";
import PropTypes, { InferProps } from "prop-types";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

import { Box, Chip, InputBase, makeStyles } from "@material-ui/core";

import { color } from "@helpers/styles";
import { toVW } from "@helpers/methods";

const useStyles = makeStyles({
  customInput: {
    color: color.text.light,
  },
});

function CustomFilterInput({
  title,
  initialData,
  setReduxData,
  type,
  width,
}: InferProps<typeof CustomFilterInput.propTypes>) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [data, setData] = useState(initialData);
  const debouncedSetData = useDebouncedCallback(
    (nextValue: string | number | null) => {
      dispatch(
        setReduxData(type !== "number" ? nextValue : +(nextValue ?? "0"))
      );
    },
    1000
  );
  return (
    <Chip
      color="primary"
      label={
        <Box>
          <strong>{title}</strong>
          <InputBase
            onChange={(e) => {
              setData(e.currentTarget.value);
              debouncedSetData(e.currentTarget.value);
            }}
            className={classes.customInput}
            type={type ?? "text"}
            value={data ?? ""}
            style={{
              width: toVW(width ?? 100, "desktop"),
            }}
          />
        </Box>
      }
    />
  );
}

CustomFilterInput.propTypes = {
  title: PropTypes.string.isRequired,
  initialData: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setReduxData: PropTypes.func.isRequired,
  width: PropTypes.number,
  type: PropTypes.string,
};

CustomFilterInput.defaultProps = {
  initialData: null,
  width: 100,
  type: "text",
};

export default memo(CustomFilterInput);
