import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";

interface Props {
  onSizeChange(value: number): void,

  onDeleteChange(value: number): void,

  onMinMaxChange(value: any): void,

  sizeNumber: number
}

export default class SizeFilterComponent extends Component<Props, {}> {

  handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onSizeChange(Number(e.currentTarget.value));
  }
  handleDelete = () => {
    this.props.onDeleteChange(0);
  }

  handleMinMaxChange = (e: React.ChangeEvent<{ value: any }>) => {
    this.props.onMinMaxChange(e.target.value);
  }

  render() {
    return (
      <Chip
        color="primary"
        onDelete={this.handleDelete}
        label={
          <Box>
            <strong>File Size</strong>
            <select
              onChange={this.handleMinMaxChange}
              style={{
                marginLeft: 8,
                background: 'transparent',
                color: 'white',
                border: 'none',
              }}>
              <option value="greaterThan"> Greater Than</option>
              <option value="lessThan"> Less Than</option>
            </select>
            <input
              onChange={this.handleSizeChange}
              type="number"
              value={this.props.sizeNumber}
              style={{
                marginLeft: 10,
                background: 'transparent',
                color: 'white',
                border: 'none',
                width: 60,
              }}
            />
          </Box>
        }
      />
    );
  }
}
