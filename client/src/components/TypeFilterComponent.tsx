import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import {MenuItem, Select} from "@material-ui/core";

interface Props {
  onTypeChange(type: string): void
}

export default class TypeFilterComponent extends Component<Props, {}> {

  handleTypeChange = (e: React.ChangeEvent<{ value: any }>) => {
    this.props.onTypeChange(e.target.value);
  }

  render() {
    return (
      <Chip
        color="primary"
        style={{marginRight: 10}}
        label={
          <Box>
            <strong>Type</strong>
            <Select
              label="File Type"
              onChange={this.handleTypeChange}
              style={{
                marginLeft: 8,
                background: 'transparent',
                color: 'white',
                border: 'none',
                width: 80,
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Directory">Directory</MenuItem>
              <MenuItem value="File">File</MenuItem>
            </Select>
          </Box>
        }
      />
    );
  }
}
