import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from "@mui/material";
import "./ItemExpiry.css";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



const ItemExpiryStatus = () => {

  const [rows, setRows] = useState([
    { id: 1, itemName: "304050", barcode: 2646546, batchno: 121314, Qty: "12", expiryDate: "12-02-26", expireInDays: "10 months", status: "notexpire ", },
    { id: 2, itemName: "203040", barcode: 1206723, batchno: 131415, Qty: "30", expiryDate: "25-01-26", expireInDays: "11 months", status: "notexpire", },
    { id: 3, itemName: "104350", barcode: 2646546, batchno: 161718, Qty: "40", expiryDate: "22-03-25", expireInDays: "36 days", status: "notexpire", },
    { id: 4, itemName: "103070", barcode: 1206723, batchno: 192021, Qty: "10", expiryDate: "10-01-25", expireInDays: "0 days", status: "expired", },

  ]);

  const [editingCell, setEditingCell] = useState({ rowId: null, field: null });


  const filterFields = ["itemName", "barcode", "expiryDate", "expireInDays", "status"];

  const [filterText, setFilterText] = useState({
    itemName: "",
    barcode: "",
    expiryDate: "",
    expireInDays: "",
    status: ""
  });

  const handleCellClick = (rowId, field) => {
    setEditingCell({ rowId, field });
  };

  const handleInputChange = (event, rowId, field) => {
    const { value } = event.target;
    setRows(prevRows =>
      prevRows.map(row =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
  };

  const handleFilterChange = (event, field) => {
    setFilterText(prev => ({
      ...prev,
      [field]: event.target.value
    }));


  };


  const filteredRows = rows.filter(row =>
    Object.keys(filterText).every(field =>
      row[field].toString().toLowerCase().includes(filterText[field].toLowerCase())
    
      
    )

  );

  return (
    <div className='table-Expiry'>
      <div className='d-flex' style={{ justifyContent: "space-between" }}>
        <p className='p-label'>DRUGS LIST WITH BATCH</p>
        <button className='btns-adjustStock btn btn-sm'>Adjust Stock</button>
      </div>

      <TableContainer component={Paper} className='TableContainer'>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead className='tableHead'>
            <TableRow className='tableRow'>
              <TableCell align="right">S.No</TableCell>
              <TableCell align="right">Item Name</TableCell>
              <TableCell align="right">Barcode</TableCell>
              <TableCell align="right">Batch No</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Expiry Date</TableCell>
              <TableCell align="right">To Expire in Days</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>


          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="right" className="serach-tablecell"></TableCell>
              {Object.keys(rows[0]).filter(field => field !== 'id').map((field, index) => (
                <TableCell key={index} align="right" className="serach-tablecell">
                  {filterFields.includes(field) ? (
                     field === "Date" ? (
                      <TextField
                        className='input-text-search'
                        id={`filter-${field}`}
                        size="small"
                        type="date"
                        value={filterText[field]}
                        onChange={(e) => handleFilterChange(e, field)}
                      />
                    ):  field === "status" ? (
                      <Select
                        className='input-text-search'
                        id={`filter-${field}`}
                        size="small"
                        value={ [field]}
                        onChange={(e) => handleFilterChange(e, field)}
                        displayEmpty
                      >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="notexpire" style={{color:"green"}}>Not Expired</MenuItem>
                        <MenuItem value="expired" style={{color:"red"}}>Expired</MenuItem>
                      </Select>
                    ) :( < TextField
                      className='input-text-search'
                  id={`filter-${field}`}
                  size="small"

                  value={filterText[field]}
                  onChange={(e) => handleFilterChange(e, field)}
                    />)
                     
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
            {filteredRows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell align="right">{index + 1}</TableCell>
                {Object.keys(row).filter(key => key !== 'id').map(field => (
                  <TableCell
                    key={field}
                    align="right"
                  // onClick={() => handleCellClick(row.id, field)}
                  >
                    {editingCell.rowId === row.id && editingCell.field === field ? (
                      <input
                        type="text"
                        value={row[field]}
                        onChange={(e) => handleInputChange(e, row.id, field)}
                        onBlur={() => setEditingCell({ rowId: null, field: null })}
                        autoFocus
                      />
                    ) : (
                      row[field]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ItemExpiryStatus;
