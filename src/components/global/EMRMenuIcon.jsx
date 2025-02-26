import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import _ from "lodash"

const EMRMenuIcon = ({ itemsArray, callbackParam }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (callback) => {
    setAnchorEl(null);
    if (_.isEmpty(callback)) {
      callback(callbackParam);
    }
  };

  return (
    <div>
      <IconButton
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {itemsArray.map((item) => (
          <MenuItem onClick={() => handleClose(item.callback)}>
            <item.icon />
            &nbsp;{item.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default EMRMenuIcon;
