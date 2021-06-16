import React from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useMemo } from "react";
import { TextField } from "@material-ui/core";

interface DropdownProps {
  anchorEl: Element | undefined 
  classes: any;
  dropdownItems: { name: string; property: string; }[];
  filterValue: number | string;
  onChange: (e: any) => void;
  onClick: (e: any) => void;
  onClose: (filter?: string) => void;
  handleMenuItemClick: (filter: string, property: string,) => void;
  isOpen: boolean;
  fieldType: string;
  selectedFilter: string;
}

export const DropdownFilter = ({classes, dropdownItems, filterValue, onChange, onClose,  onClick, handleMenuItemClick, isOpen, fieldType, selectedFilter, anchorEl }:DropdownProps) =>{


    const menuItems = useMemo(()=>{
      return dropdownItems.map((item: any)=>(<MenuItem key={item.name} onClick={()=>handleMenuItemClick(item.name, item.property)}>{item.name}</MenuItem>))
    }, [dropdownItems, handleMenuItemClick])

    return (
        <Box>
          <Button
            style={{ color: 'white' }}
            onClick={(e) => onClick(e)}
          >
            {selectedFilter}
          </Button>
          <Menu
            keepMounted
            anchorEl={anchorEl}
            open={isOpen}
            onClose={() => onClose()}
            variant="menu"
          >
            {menuItems}
          </Menu>
          <TextField 
            onChange={(e) => onChange(e)} 
            placeholder="your keyword"
            value={filterValue}
            type={fieldType}
            classes={classes.input}
          />
        </Box>
      );
}
