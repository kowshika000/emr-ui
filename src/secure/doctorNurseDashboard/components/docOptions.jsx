import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography, TextField, InputAdornment, IconButton, Chip, Badge, Stack, Tooltip } from '@mui/material';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { FilterList } from '@mui/icons-material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const DocOptions = ({ cardTitle, searchByPatientName, searchByStatus }) => {
  const [value, setValue] = useState(dayjs());
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState([]);

  const filterOptions = [
    { label: 'New Patient', color: '#ADD8E6' },
    { label: 'Old Patient', color: '#d9f2d0' },
    { label: 'Revisit', color: '#fae2d5' },
    { label: 'Walking', color: '#cce7ff' }
  ];

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterClick = (filter) => {
    searchByStatus(filter)
    setAppliedFilters((prev) =>
      prev.includes(filter.label)
        ? prev.filter((item) => item !== filter.label)
        : [...prev, filter.label]
    );
  };



  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value) {
      searchByPatientName(event.target.value)
    } else {
      searchByPatientName("")
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    searchByPatientName("")
  };

  const handleStatusReset = () => {
    setAppliedFilters([])
    setAnchorEl(null);
    searchByStatus("")
  }

  return (
    <div>
      {cardTitle === "Revenue" ? <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, marginBottom: 5 }}>


        <Typography variant="h6" align="center" sx={{ flexGrow: 1, display: 'flex', ml: '250px' }}>
          Transaction Details
        </Typography> {"   "}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date"
            inputFormat="MM/DD/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

      </Box> : cardTitle === "" ? "" :


        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          {/* Card Title and Search Box */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
              {cardTitle}
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Patient Name/ MRD No"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={clearSearch}
                      aria-label="clear search"
                      edge="end"
                      size="small"
                      sx={{ visibility: searchTerm ? 'visible' : 'hidden' }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>


          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, mr: 2 }}>
            <Button
              variant="contained"
              color={appliedFilters.length > 0 ? 'success' : 'primary'}
              startIcon={<FilterList />}
              onClick={handleButtonClick}
            >
              {appliedFilters.length > 0
                ? `Filter Applied ${appliedFilters.length}`
                : 'Filter'}
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{ style: { maxHeight: 48 * 4.5, width: 'fit-content' } }}
            >
              <Stack direction="row" spacing={0} p={1} flexWrap="wrap">
                {filterOptions.map((option) => (
                  <div>
                    <MenuItem
                      key={option.label}
                      onClick={() => handleFilterClick(option)}
                      style={{
                        padding: '8px 16px',
                        cursor: 'pointer',
                        backgroundColor: appliedFilters.includes(option.label) ? option.color : 'transparent',
                        color: appliedFilters.includes(option.label) ? 'black' : 'inherit',
                      }}
                    >
                      {option.label}
                    </MenuItem>

                  </div>
                ))}
                <MenuItem>
                  <IconButton color="primary" onClick={handleStatusReset}>
                    <RestartAltIcon />
                  </IconButton>
                </MenuItem>
              </Stack>
            </Menu>
          </Box>

         
        </Box>
      }


    </div>
  );
};

export default DocOptions;
