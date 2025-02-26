import React from 'react'
import {TextField } from '@mui/material';
import Box from "@mui/material/Box"
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import "./Stockadjustment.css"



const Stockadjust1 = () => {
    return (
        <>


            <div className='container-fluid'>
                <div className=''>

                   
                    <div className='content'>
                    <p className='p1'>Stock Adjustment</p>
                    <div className='d-flex mt-3'>
                        <label className=' mx-1 g-2'>Adjustment Date</label>
                        <TextField
                            className='inputsl'
                            id="outlined-size-small"
                            size="small"
                        />
                    </div>
                    <div className='d-flex mt-3'>
                        <label className=' mx-1 g-2'>Adjustment No</label>
                        <TextField
                            className='inputsl1'
                            id="outlined-size-small"
                            size="small"
                        />
                    </div>
                    <div className='d-flex mt-2'>
                        <label className=' mx-1 g-2'>Office-Branch</label>
                        <FormControl sx={{ m: 1, width: 250 }}>
                            <Select
                                className='inputsl2'
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"

                            >
                                <option></option>
                            </Select>
                        </FormControl>
                    </div>

                    <div className='d-flex mt-2'>
                        <label className=' mx-1 g-2'>Speciality</label>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <Select
                                className='inputsl3'
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"

                            >
                                <option></option>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='d-flex mt-2'>
                        <label className=' mx-2 g-2'>Debit/Credit</label>
                        <TextField
                            className='inputsl4'
                            id="outlined-size-small"
                            size="small"
                        />


                        < label className='mx-3'>Purchase Accounts</label>
                        <FormControl sx={{ m: 1, width: 280 }}>
                            <Select
                                className='inputsl5'
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                            >
                                <option></option>
                            </Select>
                        </FormControl>
                    </div>

                    <div className='d-flex mt-2'>
                        <label className=' mx-1 g-2'>Refernce NO</label>
                        <TextField
                            className='inputsl6'
                            id="outlined-size-small"
                            size="small"
                        />
                    </div>
                    <div className='d-flex mt-2'>
                        <label className=' mx-1 g-2'>Remarks</label>
                        <textarea className='inputsl7 mx-4' />
                    </div>


                    <Box sx={{ display: 'flex', justifyContent: "flex-end", mb: 2, me: 4, mt: 2, gap: 2 }}>
                        <button style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }} >
                            cancel
                        </button>
                        <button style={{ backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }} >
                            Save
                        </button>
                    </Box>


                    </div>
                  


                </div>

            </div>

        </>
    )
}

export default Stockadjust1