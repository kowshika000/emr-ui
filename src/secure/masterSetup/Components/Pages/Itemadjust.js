import React, { useState } from 'react'
import Box from "@mui/material/Box"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./Pages.css";
import TextField from '@mui/material/TextField';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { BsThreeDotsVertical } from "react-icons/bs"



const Itemadjust = () => {
    const [rows, setRows] = useState([

        { id: 1, AdjustmentNo: "304050", ReferenceNo: 2646546, Date: "20-01-2025", SpecialityBranch: "ENT", CreditDebitdetails: "hghghg", remarks: "adjust", status: "Approved", ItemNameOptions:<BsThreeDotsVertical/> , },
        { id: 2, AdjustmentNo: "203040", ReferenceNo: 1206723, Date: "22-01-2025", SpecialityBranch: "diabetes", CreditDebitdetails: "pghfhf", remarks: "adjust", status: "Approved", ItemNameOptions: <BsThreeDotsVertical/> , },
        { id: 3, AdjustmentNo: "104350", ReferenceNo: 2646546, Date: "23-01-2025", SpecialityBranch: "dental", CreditDebitdetails: "hghghg", remarks: "adjust", status: "Approved", ItemNameOptions:<BsThreeDotsVertical/>, },
        { id: 4, AdjustmentNo: "103070", ReferenceNo: 1206723, Date: "24-01-2025", SpecialityBranch: "MainStore", CreditDebitdetails: "pghfhf", remarks: "adjust", status: "Approved", ItemNameOptions:<BsThreeDotsVertical/> , },
    ])

    const [editingCell, setEditingCell] = useState({ rowId: null, feild: null })
    const filterFields = ["AdjustmentNo", "ReferenceNo", "Date", "SpecialityBranch", "CreditDebitdetails", "remarks", "status", "Item NameOptions"]

    const [filterText, setFilterText] = useState({
        AdjustmentNo: "",
        ReferenceNo: "",
        SpecialityBranch: "",
        CreditDebitdetails: "",
        remarks: "",
        status: "",
        ItemNameOptions: ""
    });


    const handleInputChange = (event, rowId, field) => {
        let { value } = event.target;
        if (!isNaN(value) && value.trim() !== "") {
            value = Number(value);
        }
        setRows(prevRows =>
            prevRows.map(row =>
                row.id === rowId ? { ...row, [field]: value } : row
            )
        );
    };


    const handleFilterChange = (event, field) => {
        const value = event.target.value;
        setFilterText(prev => ({
            ...prev,
            [field]: value
        }));
    };
    


    const filteredRows = rows.filter(row =>
        Object.keys(filterText).every(field => {
            const rowValue = row[field]?.toString().toLowerCase();
            const filterValue = filterText[field].toLowerCase();
            
            if (field === "Date" && filterValue) {
                return row[field] === filterValue; 
            }
            return rowValue.includes(filterValue);
        })
    );
    


    const [visible, setVisible] = useState(false)
    const [dropDown, setDropDown] = useState(false)


    const navigate = useNavigate()

    const handlePage = () => {
        navigate('/stockadjust2')

    }
    const handlePrint = () => {
        window.print( )
    }

    const dropdownOption = () => {
        setDropDown(!dropDown)
    }

    return (
        <>
            <div className='container-fluid '>


                <div className='table-content m-4'>
                    <Box sx={{ display: 'flex', justifyContent: "flex-end", mb: 2, me: 4 }}>
                        <button className='btns-adjustStock' onClick={handlePage}>
                            Adjust Stock
                        </button>
                    </Box>
                    <TableContainer component={Paper} className='TableContainer'>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead className='tableHead'>
                                <TableRow className='tableRow'>
                                    <TableCell align="right">S.No</TableCell>
                                    <TableCell align="right" >Adjustment No</TableCell>
                                    <TableCell align="right" > Reference No</TableCell>
                                    <TableCell align="right" >Date</TableCell>
                                    <TableCell align="right" >Speciality-Branch</TableCell>
                                    <TableCell align="right" >Credit/Debit details</TableCell>
                                    <TableCell align="right" >Remark</TableCell>
                                    <TableCell align="right" >Status</TableCell>
                                    <TableCell align="right" >Item Name/Options</TableCell>


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
                                                ) : (

                                                    <TextField
                                                        className='input-text-search'
                                                        id={`filter-${field}`}
                                                        size="small"
                                                        value={filterText[field]}
                                                        onChange={(e) => handleFilterChange(e, field)}
                                                    />
                                                )
                                            ) : <BsThreeDotsVertical onClick={dropdownOption} />}
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
                                                ) }
                                            </TableCell>
                                           
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                
                {dropDown && (
                    <div className='dropdown'>
                        <div className='dropdown-content'>
                            <p>view</p>
                            <p onClick={handlePrint} style={{cursor:"pointer"}}>Print</p>
                        </div>
                    </div>
                )}

            </div>

        </>
    )
}

export default Itemadjust