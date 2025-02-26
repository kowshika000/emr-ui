import React, { useRef, useState } from 'react'
import { TextField } from '@mui/material';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import "./Stockadjustment.css"
import { Table } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import { Paper } from '@mui/material';
import "./Pages.css";
import { Dialog } from 'primereact/dialog';
import InputLabel from '@mui/material/InputLabel';

import { Divider, List, Typography } from 'antd';
import { BsThreeDotsVertical } from "react-icons/bs"





const Stockadjust2 = () => {

  const dat = [
  'Branch1',
  'Branch2', 
  'Branch3',
  'Branch4'
];
const da=['Account1','Account2']
    const [dropDown, setDropDown] = useState(false)
    const dropdownOption = () => {
      setDropDown(!dropDown)
  }

  const fileInputRef = useRef(null)

  const handleTextFieldClick = () => {
    fileInputRef.current.click()
  };

  const handleFileChange = (event) => {
    console.log("Selected file:", event.target.files[0]);
  };

  const [data, setData] = useState([
    { id: 1, itemCode: 264654, itemName: "GLOVE PURE SIZE:LARGE 100\/BOX", itemPrice: 247.00, adjustmentType: "Increase", qty: 22, expiryDate: "2025-12-31", amount: 247 },
    { id: 2, itemCode: 123456, itemName: "GLOVES NITRILE EXAM SIZE:SMALL 100\/BOX ", itemPrice: 50.00, adjustmentType: "Decrease", qty: 10, expiryDate: "2026-06-15", amount:50 },
    { id: 3, itemCode: 264653, itemName: "GLOVE PURE SIZE:LARGE 100\/BOX", itemPrice: 300.00, adjustmentType: "Increase", qty: 22, expiryDate: "2025-12-31", amount: 300 },
    { id: 4, itemCode: 264652, itemName: "GLOVE DISPOSABLE SANITA SERVU", itemPrice: 250.00, adjustmentType: "Increase", qty: 30, expiryDate: "2025-12-31", amount: 250 },
    { id: 5, itemCode: 123423, itemName: "GLOVES MEDISMART STERILE SURGICAL", itemPrice: 350.00, adjustmentType: "Decrease", qty: 50, expiryDate: "2026-06-15", amount: 350 },
    { id: 6, itemCode: 264655, itemName: "Wieder Tongue Depressor", itemPrice: 600.00, adjustmentType: "Increase", qty: 12, expiryDate: "2025-12-31", amount: 600 },
    { id: 7, itemCode: 143456, itemName: "Thudichum Nasal Speculum ", itemPrice: 500.00, adjustmentType: "Decrease", qty: 10, expiryDate: "2026-06-15", amount: 500 },
  ]);

      const [searchQuery, setSearchQuery] = useState("");
  
  const [editRow, setEditRow] = useState(null);
  const [editField, setEditField] = useState("");
  const [visible, setVisible] = useState(false)
  const [showApprove, setShowApprove] = useState(false)

  const handleCellClick = (rowId, field) => {
    setEditRow(rowId);
    setEditField(field);
  };

  const handlePrint = () => {
    window.print( )
}


  const handleApprove = () => {
    setVisible(!visible)

  }
  const handleBranch = () => {
    setShowApprove(!showApprove)
  }

  const handleInputChange = (rowId, field, value) => {
    setData(prevData =>
      prevData.map(row => {
        if (row.id === rowId) {
          const updatedRow = { ...row, [field]: value };

        
          if (field === "qty") {
            const newQty = Number(value); 
            updatedRow.adjustmentType = newQty > row.qty ? "Increase" : "Decrease";
          }

          return updatedRow;
        }
        return row;
      })
    );
  };

  const filteredData = data
  .filter(item => item.itemName.toLowerCase().includes(searchQuery.toLowerCase()))

   const handleFilter = (e) => {
        setSearchQuery(e.target.value)


    }

  const handleBlur = () => {
    setEditRow(null);
    setEditField("");
  };

  return (
    <>
      <div className='container-fluid'>
        <div className="m-4">


          <div className='row  gap-2'>
            <p className='p-label'>Stock Adjustment</p>
            <div className='input-rows'>
              <TextField id="filled-basic" label="Adjustment Date" variant="filled" className='Gs-inputs' />
              <TextField id="filled-basic" label="Adjustment No" variant="filled" className='Gs-inputs' />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 230 }}>
                <InputLabel id="demo-simple-select-standard-label">Office & Branch</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Office & Branch"
                >

                  {/* <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 230 }}>
                <InputLabel id="demo-simple-select-standard-label">Purchase Account</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Purchase Account"
                >

                  {/* <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
              <TextField id="filled-basic" label="Debit/Credit" variant="filled" className='Gs-inputs' />

            </div>

          </div>



          <div className='row'>
            <div className='input-rows1'>
              {/* <TextField id="filled-basic" label="Debit/Credit" variant="filled" className='Gs-inputs' /> */}
              <TextField id="filled-basic" label="Reference No" variant="filled" className='Gs-inputs' />
              <TextField id="filled-basic" label="Created by" variant="filled" className='Gs-inputs' />
              <TextField id="filled-basic" label="Created Date" variant="filled" className='Gs-inputs' />
              <TextField id="filled-basic" label="Remarks" variant="filled" className='Gs-inputs' />



            </div>

          </div>

        </div>


      </div>





      <div className='row m-4'>

        <div className='card m-2'>
          <div className='card-details '>
            <p>Attach Documents</p>
            <div className='card-details-content'>
              <div>
                <label className='labelm mx-2 g-2'>File Name</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
               
                />

              
                <TextField
                  className="inputsm4"
                  id="outlined-size-small"
                  size="small"
                  onClick={handleTextFieldClick}

                />
              </div>

              <button className='btn btn-primary btn-sm' style={{ margin: "0px" }}>
                upload
              </button>
            </div>
          </div>

        </div>

      </div>
      <div className='row m-4'>
        <p style={{ marginBottom: "5px" }}>Adjusted item List</p>
        <div className= 'd-flex'>
          <TextField
value={searchQuery}
            placeholder='search Item'
            className='search-bar'
            id="outlined-size-small"
            size="small"
            onChange={handleFilter}
          />

          <div className=' d-flex mx-4'>
            <label className=''>main store</label>
            <TextField
              className='mx-2'
              id="outlined-size-small"
              size="small"
            />
          </div>

          <div className=' d-flex '>
            <label className='mx-2'>Speciality</label>
            <TextField

              id="outlined-size-small"
              size="small"
            />
          </div>
        </div>




        <div className='table-card-container '>
          <TableContainer component={Paper} className='TableContainer'>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead className='tableHead'>
                <TableRow className='tableRow'>
                  <TableCell align="right">S.No</TableCell>
                  <TableCell align="right" >Item Code</TableCell>
                  <TableCell align="right" > Item Name</TableCell>
                  <TableCell align="right" >Item Price</TableCell>
                  <TableCell align="right" >Adjustment Type</TableCell>
                  <TableCell align="right" >Qty</TableCell>
                  <TableCell align="right" > Expiry Date</TableCell>
                  <TableCell align="right" >Amount</TableCell>
                  <TableCell align="right" >Options</TableCell>



                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData?.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell align="right">{index + 1}</TableCell>
                    <TableCell align="right">{row.itemCode}</TableCell>
                    <TableCell align="right">{row.itemName}</TableCell>
                    <TableCell align="right">{row.itemPrice}</TableCell>

                    <TableCell align="right" onClick={() => handleCellClick(row.id, "adjustmentType")}>
                      {editRow === row.id && editField === "adjustmentType" ? (
                        <TextField
                          value={row.adjustmentType}
                          onChange={(e) => handleInputChange(row.id, "adjustmentType", e.target.value)}
                          onBlur={handleBlur}
                          autoFocus
                          size="small"
                        />
                      ) : (
                        row.adjustmentType
                      )}
                    </TableCell>

                    <TableCell align="right" onClick={() => handleCellClick(row.id, "qty")}>
                      {editRow === row.id && editField === "qty" ? (
                        <TextField
                          type="number"
                          value={row.qty}
                          onChange={(e) => handleInputChange(row.id, "qty", e.target.value)}
                          onBlur={handleBlur}
                          autoFocus
                          size="small"
                        />
                      ) : (
                        row.qty
                      )}
                    </TableCell>

                    <TableCell align="right" onClick={() => handleCellClick(row.id, "expiryDate")}>
                      {editRow === row.id && editField === "expiryDate" ? (
                        <TextField
                          type="date"
                          value={row.expiryDate}
                          onChange={(e) => handleInputChange(row.id, "expiryDate", e.target.value)}
                          onBlur={handleBlur}
                          autoFocus
                          size="small"
                          InputLabelProps={{ shrink: true }}
                        />
                      ) : (
                        row.expiryDate
                      )}
                    </TableCell>

                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right"><BsThreeDotsVertical onClick={dropdownOption} /></TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>



      <div className='btn-groups'>
        <div>
          <button className='btn btn-sm btn-primary' onClick={handleApprove} > Forward to Approve</button>
        </div>
        <button className='btn btn-sm btn-success'>Approve</button>
        <div></div>
      </div>




      <Dialog
        className='dialog2-coloms'
        visible={visible}

        onHide={() => setVisible(false)}
        draggable={false}
        resizable={false}
        modal={true}
      >


        <div>
          <p className='p2'>Forward for Approval</p>
          <div className='row d-flex '>

            {/* First Card */}
            
        
              <div className='card w-50' style={{backgroundColor:"white"}} >
                <Divider orientation="left">Select Office/Department</Divider>
                <List
                  size="small"
                 
              
                  bordered
                  dataSource={dat}
                  onClick={handleBranch}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </div>
            

         
            
              
              <div className='card w-50' style={{backgroundColor:"white"}}>
              <Divider orientation="left">Select Seats under Office/department</Divider>
                
                {showApprove && (
                  <List
                  size="small"
                
                  bordered
                  dataSource={da}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
                )}
              </div>
          

          </div>
        </div>
        <label>Remarks</label>
        <textarea className='form-control remarks-input' ></textarea>

        <div className='btn-groups2'>
          <div>
            <button className='btn btn-sm btn-primary' onClick={handleApprove} style={{ width: "100px" }}>Send</button>
          </div>
          <button className='btn btn-sm btn-danger' onClick={handleApprove} style={{ width: "100px" }}>Close</button>
          <div></div>
        </div>
      </Dialog>
      {/* </div> */}

      {dropDown && (
                    <div className='dropdown'>
                        <div className='dropdown-content'>
                            <p>view</p>
                            <p onClick={handlePrint} style={{cursor:"pointer"}}>Print</p>
                        </div>
                    </div>
                )}

    </>
  )
}

export default Stockadjust2