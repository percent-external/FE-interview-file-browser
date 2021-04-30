import { Box, Chip } from "@material-ui/core";
import React from "react";

// chip props interface
interface ChipProps {
  handleDelete: any;
  title: string;
  value: string | number;
  onChange: (value: string) => void;
  type: string;
}
export const FilterChip = (props: ChipProps) => {
  // destructing props
  const { handleDelete, title, value, onChange, type } = props;
  return (
    <Chip
      style={{ margin: "1em" }}
      color="primary"
      onDelete={handleDelete}
      label={
        <Box
          style={{
            width: "215px",
          }}
        >
          <strong>{title}</strong>
          <input
            onChange={(e) => onChange(e.target.value)}
            type={type}
            value={value}
            style={{
              marginLeft: 8,
              background: "transparent",
              color: "white",
              width: 80,
              padding: "0.3rem",
              border: "0.5px",
            }}
          />
        </Box>
      }
    />
  );
};
