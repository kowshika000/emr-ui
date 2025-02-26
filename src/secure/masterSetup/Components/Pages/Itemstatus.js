import React, { useEffect, useState, useRef } from 'react'
import { Table } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import { Paper } from '@mui/material';
import "./Pages.css";
import { TextField, Box, Typography } from "@mui/material";
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Select from '@mui/material/Select';
import { motion } from "framer-motion";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { IoCloseSharp } from "react-icons/io5";
import { Diversity1TwoTone } from '@mui/icons-material';
import { InventoryItems } from '../Data';
import { batches } from '../Data2';
import Barcode from "react-barcode";
import { useReactToPrint } from "react-to-print";
import { display, height } from '@mui/system';
import { Department } from '../Data3';
import { BarcodeOutlined } from "@ant-design/icons";







const Itemstatus = () => {
    

    const protrans = [
        {
            "Qty": 10,
            "UnitPrice": 200,
            "Saleunit": 20,
            "s.no": 1,
            "salesunit": "pcs",
            "date": "01-02-2025",
            "type": "Stock Consumption",
            "Spciality": "Mainstore",
            "Barcode": "3546-0210",
        },
        {
            "Qty": 20,
            "UnitPrice": 200,
            "Saleunit": 10,
            "s.no": 2,
            "salesunit": "pcs",
            "date": "02-02-2025",
            "type": "Stock Consumption",
            "Spciality": "Mainstore",
            "Barcode": "3546-0211",

        },
        {
            "Qty": 10,
            "UnitPrice": 100,
            "Saleunit": 5,
            "s.no": 2,
            "salesunit": "pcs",
            "date": "03-02-2025",
            "type": "Stock Consumption",
            "Spciality": "Mainstore",
            "Barcode": "3546-0212",

        },
    ]

  const printRef = useRef(null);

    const handlePrint = () => {
        if (!printRef.current) {
          console.error("Print reference is not set");
          return;
        }
        triggerPrint();
      };
      
      const triggerPrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: "Barcode Print",
        onAfterPrint: () => console.log("Print completed!"),
      });
      


    const data = InventoryItems;
    const batch = batches;
    const depart = Department


    useEffect(() => {
        console.log('hi', data)
    }, [])
    const [searchQuery, setSearchQuery] = useState("");
    const [stockFilter, setStockFilter] = useState("All");
    const [productCat, setProductCat] = useState("All")
    const [itemName, setItemName] = useState('');
    const [itemUnit, setItemUnit] = useState('')
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showTable, setShowTable] = useState(false);
    const [visible, setVisible] = useState(false);
    const [mainTable, setMainTable] = useState(true);
    const [visi, setVisi] = useState(false);
    const [showBarcode, setShowBarcode] = useState(false);


    const handleFilter = (e) => {
        setSearchQuery(e.target.value)

    }

    const filteredData = data
        .filter(item => item.ItemName.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(item => {
            if (stockFilter === "All") return true;
            if (stockFilter === "Stock Available") return item.SaleUnit > 0;
            if (stockFilter === "No Stock") return item.SaleUnit === 0;
            if (stockFilter === "Below Reorder") return item.Reorderlevel > item.SaleUnit;
            return true;
        })
        .filter(item => {
            if (productCat === "All") return true;
            if (productCat === "Consumables") return item.Category === "CONSUMABLES";
            if (productCat === "Capital assets") return item.Category === "CAPITAL ASSETS";
            return true;
        });


    const handleStockFilter = (event) => {
        setStockFilter(event.target.value);
    };

    useEffect(() => {
        const today = new Date();
        updateMonthRange(today);
    }, []);

    const updateMonthRange = (date) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        setStartDate(firstDay.toISOString().split("T")[0]);
        setEndDate(lastDay.toISOString().split("T")[0]);

    };


    const handleDisplay = (data) => {
        setShowTable(!showTable)
        setMainTable(!mainTable)
        console.log("nantha", data)
        setItemName(data)



    }
    const handleShowed = (data) => {
        console.log(data)
        setItemName(data?.ItemName)
        setItemUnit(data?.salesunit)
        setVisible(true)
    }

    const handleshowed = (data) => {
        console.log("vanakkam da ", data)
        setItemName(data?.ItemName)
        setItemUnit(data?.salesunit)

        setVisi(true)
    }

    const handleClosed = () => {
        setShowTable(!showTable)
        setMainTable(!mainTable)

    }
    const handleCategoryFilter = (event) => {
        setProductCat(event.target.value);
    };




    return (
        <>
            <div className='container-fluid m'>
                <div className='card m-4'>
                    <div className='m-4'>

                        <div className='row '>

                            {/* <div className='d-flex gap-3'> */}
                            <div className='label-input mt-2 p-0 col-sm'>

                                <TextField id="filled-basic" label="Product Name" variant="filled" className='Gs-inputs' value={searchQuery} onChange={handleFilter} />
                            </div>
                            <div className='label-input mt-2 p-0 col-sm'>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 230 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Stock Availability</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Stock Availability"
                                        value={stockFilter}
                                        onChange={handleStockFilter}
                                    >

                                        <MenuItem value={"All"}>All</MenuItem>
                                        <MenuItem value={"Stock Available"}>Stock Available</MenuItem>
                                        <MenuItem value={"No Stock"}>No Stock</MenuItem>
                                        <MenuItem value={"Below Reorder"}>Below Rrecorder</MenuItem>

                                    </Select>
                                </FormControl>

                            </div>
                            <div className='label-input mt-2 p-0 col-sm'>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 230 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Branch&Speciality</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Stock Availability"
                                    >

                                    </Select>
                                </FormControl>
                            </div>

                            <div className='label-input  mt-2 p-0 col-sm' id='label-input-Supplier'>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 230 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Supplier</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Stock Availability"
                                    >

                                        {/* <MenuItem value={10}>Ten</MenuItem>
                                              <MenuItem value={20}>Twenty</MenuItem>
                                              <MenuItem value={30}>Thirty</MenuItem> */}
                                    </Select>
                                </FormControl>

                            </div>
                            <div className='label-input mt-2 col-sm' id='label-input-Product'>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 230 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Product Category</InputLabel>
                                    <Select
                                        labelId="category-select-label"
                                        id="category-select"
                                        value={productCat}
                                        onChange={handleCategoryFilter}
                                    >
                                        <MenuItem value="All">All</MenuItem>
                                        <MenuItem value="Consumables">Consumables</MenuItem>
                                        <MenuItem value="Capital assets">Capital assets</MenuItem>
                                    </Select>
                                </FormControl>

                            </div>
                            {/* </div> */}





                        </div>



                        <div className='row mt-3'>
                            <div calssName='' style={{ display: "flex", justifyContent: "space-between" }}>
                                <div className='d-flex p-2'>
                                    <div>
                                        <label className='radio-label'>Stock Unit</label>
                                        <input className='form-check-input' type='radio' name='stock' />
                                    </div>
                                    <div className='mx-2'>
                                        <label className='radio-label'>Sale Unit</label>
                                        <input className='form-check-input' type='radio' name='stock' />
                                    </div>
                                    <div className='mx-2'>
                                        <label className='radio-label'>Purchase Unit</label>
                                        <input className='form-check-input' type='radio' name='stock' />

                                    </div>
                                </div>
                                <div className=''>
                                    <Box >
                                        <button style={{ backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', marginTop: "20px" }}>
                                            Create Request
                                        </button>
                                    </Box>
                                </div>


                            </div>
                        </div>


                    </div>
                </div>









                <div className='Table-Button-Container m-4'>

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: showTable ? 1 : 0, y: showTable ? 0 : -10 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        style={{ display: showTable ? "block" : "none" }}
                    >
                        {showTable && (

                            <div className='card'>

                                <p className='p'>Product Stock Transaction Details
                                    <span style={{ float: "inline-end", marginRight: "5px" }}><IoCloseSharp onClick={handleClosed} /></span></p>


                                <div className='card-body d-flex'>
                                    <div className='col'>

                                        <label className=' m-2 g-2'>Item Name</label>
                                        <TextField
                                            value={itemName}
                                            id="outlined-size-small"
                                            size="small"
                                        />


                                        <br></br>
                                        <div className='date'>


                                            <label className='mx-4'>Period</label>

                                            <TextField
                                                value={startDate}
                                                name='fromdate'
                                                className='mx-2'
                                                type='date'
                                                id="outlined-size-small"
                                                size="small"
                                                onClick={(e) => setStartDate(e.target.value)}
                                            />

                                            <TextField
                                                value={endDate}
                                                name="todate"
                                                className='g-1'
                                                type='date'
                                                id="outlined-size-small"
                                                size="small"
                                                onClick={(e) => setEndDate(e.target.value)}


                                            />
                                        </div>
                                    </div>
                                    <div className='col'>

                                        <label className=''>main store</label>
                                        <TextField
                                            className='mx-2'
                                            id="outlined-size-small"
                                            size="small"
                                        />

                                        <br></br>
                                        <div className='mt-2'>
                                            <label className='mx-2'>Speciality</label>
                                            <TextField

                                                id="outlined-size-small"
                                                size="small"
                                            />
                                        </div>

                                    </div>

                                </div>
                                <div className='table-card-container'>
                                    <TableContainer component={Paper} className='TableContainer'>
                                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                            <TableHead className='tableHead'>
                                                <TableRow className='tableRow'>
                                                    <TableCell align="right">S.No</TableCell>
                                                    <TableCell align="right" >Date</TableCell>
                                                    <TableCell align="right" >Type</TableCell>
                                                    <TableCell align="right" >Speciality</TableCell>
                                                    <TableCell align="right" >Barcode</TableCell>
                                                    <TableCell align="right" >Qty</TableCell>
                                                    <TableCell align="right" > Unit price</TableCell>
                                                    <TableCell align="right" >Stock  (in sale unit) in Main Store</TableCell>
                                                    {/* <TableCell align="right" > Stock  (in sale unit) in Dept</TableCell> */}


                                                </TableRow>
                                            </TableHead>
                                            {protrans.map((item, index) => (<TableBody>

                                                <TableRow
                                                    key={index}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >

                                                    <TableCell align="right">{index+1}</TableCell>
                                                    <TableCell align="right" >{item.date}</TableCell>
                                                    <TableCell align="right">{item.type}</TableCell>
                                                    <TableCell align="right">{item.Spciality}</TableCell>
                                                    <TableCell align="right" >{item.Barcode}</TableCell>
                                                    <TableCell align="right">{item.Qty}</TableCell>
                                                    <TableCell align="right">{item['UnitPrice']}</TableCell>
                                                    <TableCell align="right" >{item['salesunit']}</TableCell>

                                                </TableRow>

                                            </TableBody>))}

                                        </Table>
                                    </TableContainer>

                                </div>




                            </div>
                        )}
                    </motion.div>



                </div>
                {mainTable && (<div className='TableContainer m-4 mt-4'>
                    <TableContainer component={Paper} className='TableContainer'>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead className='tableHead'>
                                <TableRow className='tableRow'>
                                    <TableCell align="right">S.No</TableCell>
                                    <TableCell align="right" >Item Code</TableCell>
                                    <TableCell align="right" >Item Name</TableCell>
                                    <TableCell align="right" >Category</TableCell>
                                    <TableCell align="right" > Sub Category</TableCell>
                                    <TableCell align="right" >Item Price</TableCell>
                                    <TableCell align="right" >Reorder Level</TableCell>
                                    <TableCell align="right" >Item Unit</TableCell>
                                    <TableCell align="right" >Stock available (in sale unit) in Main Store</TableCell>
                                    <TableCell align="right" > Stock available (in sale unit) in Dept</TableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData?.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell align="right">{index+1}</TableCell>
                                        <TableCell align="right">{item['ItemCode']}</TableCell>
                                        <TableCell align="right" style={{ fontWeight: "600", }} onClick={() => handleDisplay(item['ItemName'])}>{item['ItemName']}</TableCell>
                                        <TableCell align="right">{item.Category}</TableCell>
                                        <TableCell align="right">{item['SubCategory']}</TableCell>
                                        <TableCell align="right" >{item['PurchasePrice']}</TableCell>
                                        <TableCell align="right">{item.Reorderlevel}</TableCell>
                                        <TableCell align="right">{item['UnitsPerPack']}</TableCell>
                                        <TableCell align="right"  style={{fontWeight:"600"}}onClick={() => handleShowed(item)}>{item['SaleUnit']}</TableCell>
                                        <TableCell align="right" style={{fontWeight:"600"}} onClick={() => handleshowed(item)}>{item['SaleUnit']}</TableCell>


                                    </TableRow>
                                ))}



                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>)}

                <Dialog
                    visible={visi}
                    onHide={() => setVisi(false)}
                    draggable={false}
                    resizable={false}
                    modal={true}
                >

                    <div className='card '>
                        <p className='p'>Department wise stock details</p>
                        <div className="row m-3">
                            {/* <div className='card-body '> */}
                            <div className='col-sm'>
                                <label className='m-2 g-2'>Item Name</label>
                                <TextField
                                    value={itemName} id="outlined-size-small"
                                    size="small"
                                />

                                <label className='m-2 g-2'>Item Category</label>
                                <TextField
                                    value={"general"}

                                    id="outlined-size-small"
                                    size="small"
                                />
                                <label className=' m-2 g-2 '>Reorder Level</label>
                                <TextField
                                    id="outlined-size-small"
                                    size="small"
                                    value={'0'}
                                />

                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-sm" style={{ marginLeft: "30px" }}>
                                <label className='mx-2'>item unit</label>
                                <TextField
                                    value={itemUnit}
                                    className='mx-2'
                                    type=''
                                    id="outlined-size-small"
                                    size="small"

                                />


                            </div>

                            <div className='col-sm mt-2'>
                                <label className='mx-3'>Total Stock</label>
                                <TextField
                                    value={'15'}
                                    id="outlined-size-small"
                                    size="small"
                                />
                            </div>




                        </div>

                        {/* </div> */}


                        <div className='table-card-container '>
                            <TableContainer component={Paper} className='TableContainer'>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead className='tableHead'>
                                        <TableRow className='tableRow'>
                                            <TableCell align="right">S.No</TableCell>
                                            <TableCell align="right" >Speciality</TableCell>
                                            <TableCell align="right" > Barcode</TableCell>
                                            <TableCell align="right" >Stock (in sale unit)</TableCell>
                                            <TableCell align="right" >Item Price</TableCell>
                                            <TableCell align="right" >Sale Price</TableCell>
                                            <TableCell align="right" > Expiry Date</TableCell>
                                            <TableCell align="right" >Status</TableCell>
                                            <TableCell align="right" >Barcode</TableCell>


                                        </TableRow>
                                    </TableHead>

                                    {depart.map((item, index) => (
                                        <TableBody>

                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >

                                                <TableCell align="right">{index+1}</TableCell>
                                                <TableCell align="right">{item.Speciality}</TableCell>
                                                <TableCell align="right">{item.Barcode}</TableCell>
                                                <TableCell align="right">{item.Saleunit}</TableCell>
                                                <TableCell align="right" >{item.itemprice}</TableCell>
                                                <TableCell align="right">{item.Saleprice}</TableCell>
                                                <TableCell align="right">{item.expirydate}</TableCell>
                                                <TableCell align="right">{item.status}</TableCell>
                                                <TableCell align="right" > <button onClick={handlePrint} style={{ border: "0px", background: "none", cursor: "pointer" }}>
                                                        <BarcodeOutlined style={{ fontSize: "24px" }} />
                                                    </button>  </TableCell>





                                            </TableRow>


                                        </TableBody>
                                    ))}

                                </Table>
                            </TableContainer>

                               <div style={{ display: "none" }}>
                                <div ref={printRef}>
                                    <h3>Product Barcode</h3>
                                    {batch.map((item, index) => (
                                        <div key={index} style={{ marginBottom: "20px" }}>
                                            <Barcode value={item.barcode} format="CODE128" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                </Dialog>

                <Dialog
                    visible={visible}

                    onHide={() => setVisible(false)}
                    draggable={false}
                    resizable={false}
                    modal={true}
                >
                    <div className='card'>

                        <p className='p'>Stock details-Batch wise</p>

                        <div className='card-body d-flex'>
                            <div className='col-log-4'>
                                <label className=' m-2 g-2'>Item Name</label>
                                <TextField
                                    id="outlined-size-small"
                                    size="small"
                                    value={itemName}
                                />

                                <br></br>
                                <label className='mx-2'>item unit</label>
                                <TextField
                                    value={itemUnit}
                                    className='mx-2'
                                    id="outlined-size-small"
                                    size="small"
                                />

                            </div>
                            <div className='col'>

                                <label className=''>Item Category</label>
                                <TextField
                                    value='general'
                                    className='mx-2'
                                    id="outlined-size-small"
                                    size="small"
                                />
                                <label className=' m-2 g-2 '>Recorder Level</label>
                                <TextField
                                    value='0'
                                    id="outlined-size-small"
                                    size="small"
                                />

                                <br></br>
                                <div className='mt-2'>
                                    <label className='mx-3'>Total Stock</label>
                                    <TextField
                                        value='350'
                                        id="outlined-size-small"
                                        size="small"
                                    />
                                </div>

                            </div>

                        </div>

                        <div className='table-card-container'>
                            <TableContainer component={Paper} className='TableContainer'>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead className='tableHead'>
                                        <TableRow className='tableRow'>
                                            <TableCell align="right">S.No</TableCell>
                                            <TableCell align="right" >Barcode#</TableCell>
                                            <TableCell align="right" > (In Purchase Unit)</TableCell>
                                            <TableCell align="right" >Item Price</TableCell>
                                            <TableCell align="right" >Sale Price</TableCell>
                                            <TableCell align="right" >Expiry Date</TableCell>
                                            <TableCell align="right" > Status</TableCell>
                                            <TableCell align="right" >Barcode</TableCell>


                                        </TableRow>
                                    </TableHead>
                                    {batch.map((batch, index) => (
                                        <TableBody>

                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >

                                                <TableCell align="right">{index + 1}</TableCell>
                                                <TableCell align="right">{batch.barcode}</TableCell>
                                                <TableCell align="right">{batch['purchaseunit']}</TableCell>
                                                <TableCell align="right">{batch['itemprice']}</TableCell>
                                                <TableCell align="right" >{batch['saleprice']}</TableCell>
                                                <TableCell align="right">{batch.expirydate}</TableCell>
                                                <TableCell align="right">{batch.status}</TableCell>
                                                <TableCell align="right">

                                                    <button onClick={handlePrint} style={{ border: "0px", background: "none", cursor: "pointer" }}>
                                                        <BarcodeOutlined style={{ fontSize: "24px" }} />
                                                    </button>

                                                </TableCell>


                                            </TableRow>

                                        </TableBody>
                                    ))}

                                </Table>
                            </TableContainer>
                            <div style={{ display: "none" }}>
                                <div ref={printRef}>
                                    <h3>Product Barcode</h3>
                                    {batch.map((item, index) => (
                                        <div key={index} style={{ marginBottom: "20px" }}>
                                            <Barcode value={item.barcode} format="CODE128" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </Dialog>



            </div >



        </>

    )
}

export default Itemstatus