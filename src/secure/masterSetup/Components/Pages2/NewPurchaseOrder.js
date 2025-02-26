import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import "./PoRequest.css"
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';

import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
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

const NewPurchaseOrder = () => {
const navigate = useNavigate()
    const[open,setOpen]  =useState(false);

    const handleModal = () =>{
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
        navigate('/newpurchaseorder2')
      };
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
                            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
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
                        <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
                            <InputLabel id="demo-select-small-label">Speciality</InputLabel>
                            <Select

                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Speciality"></Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
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

                    </div>

                </div>

               
                    <div className='row mt-5'>
                        <div className="col-sm">
                            <p>Remarks</p>
                            <textarea className='form-control'></textarea>
                        </div>
                        <div className="col-sm">
                            <p>Terms & Conditions</p>
                            <textarea className='form-control'  onClick={handleModal}></textarea>
                        </div>

                    </div>




                    <div className='pro-buttons1'>
                    <button className='btns-adjustStock btn btn-sm' >Save </button>
                    <button className='btns-adjustStock btn btn-sm'>Back</button>
                </div>

                <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          Terms And  Conditions
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead className='table-pro'>
                                <TableRow>
                                    <StyledTableCell align="left">S.No</StyledTableCell>
                                    <StyledTableCell align="left">Terms and Conditions</StyledTableCell>
                            
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <StyledTableRow >

                                    <StyledTableCell align="left">{"1"}</StyledTableCell>
                                    <StyledTableCell align="left">{"Cash on Deilvary"}</StyledTableCell>
                        




                                </StyledTableRow>
                                <StyledTableRow >

                                    <StyledTableCell align="left">{"2"}</StyledTableCell>
                                    <StyledTableCell align="left">{"Cash/Cheque on delivary "}</StyledTableCell>
                                   




                                </StyledTableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
        </List>
      </Dialog>

            </div>
        </>
    )
}

export default NewPurchaseOrder