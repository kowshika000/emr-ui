import React from 'react'
import TextField from '@mui/material/TextField';
import "./PoRequest.css"
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
;



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },

    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const PoRequest = () => {
    const navigate = useNavigate();

    const handlePurchase = ()=>{
        navigate('/newpurchaseorder')
    }

    return (
        <>
            <div className='container-fluid'>
                <div className='pro-buttons'>
                <button className='btns-adjustStock btn btn-sm' onClick={handlePurchase}>New Purchase Order </button> 
                <button className='btns-adjustStock btn btn-sm'>Po For Request</button>
                </div>
                <div className='row'>
                    <div className=" col ">
                        <div className='po-inputs1'>
                            <TextField id="outlined-basic" label="OrderNO" variant="outlined" className='po-inputs' sx={{
                                "& .MuiInputLabel-root": { fontSize: "13px" }
                            }} />
                            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
                                <InputLabel id="demo-select-small-label">Suppliers</InputLabel>
                                <Select
                                    className='po-inputs'
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    label="Suppliers"
                                ></Select>
                            </FormControl>
                            <TextField id="outlined-basic" label="Request No" variant="outlined" className='po-inputs' />
                            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
                                <InputLabel id="demo-select-small-label">Delivery Status</InputLabel>
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
                        <TextField id="outlined-basic" label="Net Amount" variant="outlined" className='po-inputs' />
                        <TextField id="outlined-basic" label="Speciality" variant="outlined" className='po-inputs' />
                        <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
                            <InputLabel id="demo-select-small-label">Send Status</InputLabel>
                            <Select

                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Send Status"></Select>
                        </FormControl>

                    </div>


                </div>
                <div className='row'>
                    <div className='po-inputs1'>
                        <TextField id="outlined-basic" label="Net Amount" variant="outlined" className='po-inputs' />
                        <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
                            <InputLabel id="demo-select-small-label">Status</InputLabel>
                            <Select

                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Status"></Select>
                        </FormControl>
                    </div>

                </div>







                <div className='table-container-details'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead className='table-pro'>
                                <TableRow>
                                    <StyledTableCell align="right">S.No</StyledTableCell>
                                    <StyledTableCell align="right">Order No</StyledTableCell>
                                    <StyledTableCell align="right">Order Date</StyledTableCell>
                                    <StyledTableCell align="right">Supplier</StyledTableCell>
                                    <StyledTableCell align="right">Net Amount</StyledTableCell>
                                    <StyledTableCell align="right">Request No</StyledTableCell>
                                    <StyledTableCell align="right">Speciality</StyledTableCell>
                                    <StyledTableCell align="right">Delivary Status</StyledTableCell>
                                    <StyledTableCell align="right">Status</StyledTableCell>
                                    <StyledTableCell align="right">Send Status</StyledTableCell>
                                    <StyledTableCell align="right">Options</StyledTableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <StyledTableRow >

                                    <StyledTableCell align="right">{"1"}</StyledTableCell>
                                    <StyledTableCell align="right">{"PO01-1001"}</StyledTableCell>
                                    <StyledTableCell align="right">{"10.02.2025"}</StyledTableCell>
                                    <StyledTableCell align="right">{"Medicals"}</StyledTableCell>
                                    <StyledTableCell align="right">{"24,000"}</StyledTableCell>
                                    <StyledTableCell align="right">{"MR006"}</StyledTableCell>
                                    <StyledTableCell align="right">{"Clinic"}</StyledTableCell>
                                    <StyledTableCell align="right">{"Open"}</StyledTableCell>
                                    <StyledTableCell align="right">{"Approved"}</StyledTableCell>
                                    <StyledTableCell align="right">{"Send"}</StyledTableCell>
                                    <StyledTableCell align="right">{"ff"}</StyledTableCell>




                                </StyledTableRow>
                                <StyledTableRow >

                                    <StyledTableCell align="right">{"1"}</StyledTableCell>
                                    <StyledTableCell align="right">{"PO02-1002"}</StyledTableCell>
                                    <StyledTableCell align="right">{"11.02.2025"}</StyledTableCell>
                                    <StyledTableCell align="right">{"Medicals"}</StyledTableCell>
                                    <StyledTableCell align="right">{"24,000"}</StyledTableCell>
                                    <StyledTableCell align="right">{"MR006"}</StyledTableCell>
                                    <StyledTableCell align="right">{"Clinic"}</StyledTableCell>
                                    <StyledTableCell align="right">{"Closed"}</StyledTableCell>
                                    <StyledTableCell align="right">{"Approved"}</StyledTableCell>
                                    <StyledTableCell align="right">{"Not-Send"}</StyledTableCell>
                                    <StyledTableCell align="right">{"hh"}</StyledTableCell>




                                </StyledTableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

               
            </div>

        </>
    )
}

export default PoRequest