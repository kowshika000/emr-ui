import React from 'react'
import TextField from '@mui/material/TextField';
import "./PoRequest.css"
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const NewPurchaseOrder2 = () => {
    return (
        <>
            <div className='container-fluid'>
                <div className='pro-buttons'>
                    <button className='btns-adjustStock btn btn-sm' >New Purchase Order </button>
                    <button className='btns-adjustStock btn btn-sm'>Po For Request</button>
                </div>
                <div className='row'>
                    <div className=" col ">
                        <div className='po-inputs1'>
                            <TextField id="outlined-basic" label="OrderNO" variant="outlined" className='po-inputs' sx={{
                                "& .MuiInputLabel-root": { fontSize: "13px" }
                            }} />
                            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
                                <InputLabel id="demo-select-small-label">Payment Items</InputLabel>
                                <Select
                                    className='po-inputs'
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    label="Suppliers"
                                ></Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
                                <InputLabel id="demo-select-small-label">Supplier</InputLabel>
                                <Select

                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    label="Delivery Status"></Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 230 }} size="small">
                                <InputLabel id="demo-select-small-label">Doctor</InputLabel>
                                <Select

                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    label="Delivery Status"></Select>
                            </FormControl>
                        </div>


                    </div>

                </div>
                <div className='row'>
                    <div className='po-inputs1'>
                        <TextField id="outlined-basic" label="Order Date" variant="outlined" className='po-inputs' />
                        <TextField id="outlined-basic" label="Due Date" variant="outlined" className='po-inputs' />
                        <FormControl sx={{ m: 1, minWidth: 230 }} size="small">
                            <InputLabel id="demo-select-small-label">Speciality</InputLabel>
                            <Select

                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Speciality"></Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 230 }} size="small">
                            <InputLabel id="demo-select-small-label">Credit Limit Days</InputLabel>
                            <Select

                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Credit Limit Days"></Select>
                        </FormControl>

                    </div>


                </div>
                <div className='row'>
                    <div className='po-inputs1'>
                        <TextField id="outlined-basic" label="Delivery Location" variant="outlined" className='po-inputs' />
                        <TextField id="outlined-basic" label="Office Branch" variant="outlined" className='po-inputs' />

                    </div>
                    <div className='row mt-5'>
                        <div className='po-inputs1 '>
                        <TextField label="Remarks" variant="outlined"  className='po-inputs' />
                        <TextField label="Terms and Conditions" variant="outlined"  className='po-inputs' />
                        </div>

                    </div>
                   
                </div>
                <div className='row'>
                
                              <div className='card-details'>
                                <p>Attach Documents</p>
                                <div className='card-details-content'>
                                  <div className='d-flex gap-5'>
                                    <label className='labelm mx-2 g-2'>File Name</label>
                                    <TextField
                                      className='inputsm4'
                                      id="outlined-size-small"
                                      size="small"
                                    />
                                  <button className='btns-adjustStock btn btn-sm' >Upload </button>

                                  </div>
                               
                                </div>
                              </div>
                          
                </div>
                
            </div>

        </>
    )
}

export default NewPurchaseOrder2