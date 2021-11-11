import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";

interface Props {
  onNameChange(value: string): void
}

export default class NameFilterComponent extends Component<Props, {}> {

  handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onNameChange(e.currentTarget.value.toLowerCase());
  }

  render() {
    return (
      <Chip
        color="primary"
        style={{marginRight: 10}}
        label={
          <Box>
            <strong>Name</strong>
            <input
              type="text"
              onChange={this.handleNameChange}
              style={{
                marginLeft: 8,
                background: 'transparent',
                color: 'white',
                border: 'none',
                width: 80,
              }}
            />
          </Box>
        }
      />
    );
  }
}
